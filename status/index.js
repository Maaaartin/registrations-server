/* eslint-disable no-console */
const http = require('http');
const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// ---- helpers ---------------------------------------------------------------

function calcCpuPercentUnix(stats) {
  // Based on Docker CLI’s calculation
  const cpuStats = stats.cpu_stats || {};
  const precpuStats = stats.precpu_stats || {};
  const cpuDelta =
    (cpuStats.cpu_usage?.total_usage ?? 0) -
    (precpuStats.cpu_usage?.total_usage ?? 0);
  const systemDelta =
    (cpuStats.system_cpu_usage ?? 0) - (precpuStats.system_cpu_usage ?? 0);

  const onlineCpus =
    cpuStats.online_cpus ?? cpuStats.cpu_usage?.percpu_usage?.length ?? 0;

  if (cpuDelta > 0 && systemDelta > 0 && onlineCpus > 0) {
    return (cpuDelta / systemDelta) * onlineCpus * 100.0;
  }
  return 0;
}

function getMemUsage(stats) {
  const ms = stats.memory_stats || {};
  const usage = (ms.usage ?? 0) - (ms.stats?.cache ?? 0); // closer to "real" usage
  const limit = ms.limit ?? 0;
  const percent = limit > 0 ? (usage / limit) * 100.0 : 0;
  return { usage, limit, percent };
}

function safeNum(n) {
  return Number.isFinite(n) ? n : 0;
}

// ---- core ------------------------------------------------------------------

const getStatus = async () => {
  const containers = await docker.listContainers({ all: true });

  const statuses = await Promise.all(
    containers.map(async (c) => {
      const id = c.Id;
      const name = (c.Names?.[0] || '').replace(/^\//, '');

      try {
        const container = docker.getContainer(id);

        // Inspect with size to get writable layer size (disk usage attributed to this container)
        const [inspect, stats] = await Promise.all([
          container.inspect({ size: true }),
          // stream:false returns a single snapshot with precpu_stats included
          container.stats({ stream: false }).catch(() => null) // stats can fail if container just stopped
        ]);

        const status = inspect.State?.Status || 'unknown';
        const health = inspect.State?.Health?.Status || 'unknown';

        // CPU / Mem
        let cpuPercent = 0;
        let memUsage = 0;
        let memLimit = 0;
        let memPercent = 0;
        let pids = 0;

        // Net & IO
        let netRx = 0;
        let netTx = 0;
        let ioRead = 0;
        let ioWrite = 0;

        if (stats) {
          cpuPercent = calcCpuPercentUnix(stats);
          const mem = getMemUsage(stats);
          memUsage = mem.usage;
          memLimit = mem.limit;
          memPercent = mem.percent;

          pids = safeNum(stats.pids_stats?.current);

          // Network (sum all interfaces)
          const nets = stats.networks || {};
          for (const key of Object.keys(nets)) {
            netRx += safeNum(nets[key].rx_bytes);
            netTx += safeNum(nets[key].tx_bytes);
          }

          // Block IO totals
          const blk = stats.blkio_stats?.io_service_bytes_recursive || [];
          for (const item of blk) {
            const op = item.op?.toLowerCase();
            const val = safeNum(item.value);
            if (op === 'read') ioRead += val;
            if (op === 'write') ioWrite += val;
          }
        }

        // Writable layer size (container’s diff)
        const diskSizeRw = safeNum(inspect.SizeRw); // bytes
        // Root FS size (full size including base image layers; often not as useful per-container)
        const diskSizeRootFs = safeNum(inspect.SizeRootFs);

        return {
          id,
          name,
          status,
          health,
          cpuPercent: +cpuPercent.toFixed(2),
          memUsage,
          memLimit,
          memPercent: +memPercent.toFixed(2),
          diskSizeRw,
          diskSizeRootFs,
          pids,
          netRx,
          netTx,
          ioRead,
          ioWrite
        };
      } catch (e) {
        return {
          id,
          name,
          status: 'not found',
          health: 'n/a',
          cpuPercent: 0,
          memUsage: 0,
          memLimit: 0,
          memPercent: 0,
          diskSizeRw: 0,
          diskSizeRootFs: 0,
          pids: 0,
          netRx: 0,
          netTx: 0,
          ioRead: 0,
          ioWrite: 0,
          error: e?.message
        };
      }
    })
  );

  return statuses;
};

// ---- server ----------------------------------------------------------------

http
  .createServer(async (req, res) => {
    try {
      if (req.url === '/') {
        const statuses = await getStatus();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(statuses, null, 2));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err?.message || 'Unknown error' }));
    }
  })
  .listen(8080, () => {
    console.log('Status server running on port 8080');
  });
