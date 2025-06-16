const http = require('http');
const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const getStatus = async () => {
  const containers = await docker.listContainers({ all: true });
  const services = containers.map((c) => ({
    id: c.Id,
    name: c.Names[0].replace(/^\//, '')
  }));
  const statuses = await Promise.all(
    services.map(async ({ id, name }) => {
      try {
        const container = docker.getContainer(id);
        const data = await container.inspect();
        return {
          name,
          status: data.State.Status,
          health: data.State.Health?.Status || 'unknown'
        };
      } catch (e) {
        return { name, status: 'not found', health: 'n/a' };
      }
    })
  );
  return statuses;
};

http
  .createServer(async (req, res) => {
    if (req.url === '/') {
      const statuses = await getStatus();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(statuses, null, 2));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  })
  .listen(8080, () => {
    console.log('Status server running on port 8080');
  });
