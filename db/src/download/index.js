const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
const mapping = require('./mapping.json');

const projectRoot = path.resolve(__dirname, '..', '..');
async function downloadFile(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.statusText}`);
  }

  const totalBytes = response.headers.get('content-length');
  if (!totalBytes) {
    console.warn(
      `No content-length for ${url}, progress tracking may be inaccurate.`
    );
  }

  const fileStream = fs.createWriteStream(outputPath);
  let downloadedBytes = 0;

  await new Promise((resolve, reject) => {
    response.body.on('data', (chunk) => {
      downloadedBytes += chunk.length;
      if (totalBytes) {
        const progress = ((downloadedBytes / totalBytes) * 100).toFixed(2);
        process.stdout.write(`Downloading ${url}: ${progress}%\r`);
      } else {
        process.stdout.write(`Downloading ${url}: ${downloadedBytes} bytes\r`);
      }
    });

    response.body.pipe(fileStream);
    response.body.on('end', () => {
      console.log(`\nDownload completed: ${outputPath}`);
      resolve();
    });
    response.body.on('error', reject);
  });
}

function runChildImport(tableName) {
  return new Promise((resolve, reject) => {
    const child = spawn('yarn', ['start', 'import', tableName], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true
    });

    child.stdout.on('data', (data) => {
      process.stdout.write(`[Worker ${tableName}] ${data}`);
    });

    let stderrOutput = '';
    child.stderr.on('data', (data) => {
      process.stderr.write(`[Worker ${tableName} ERROR] ${data}`);
      stderrOutput += data.toString();
    });

    child.on('error', (err) => {
      reject(new Error(`Worker ${tableName} failed to start: ${err.message}`));
    });

    // Handle process exit
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Worker ${tableName} exited with code ${code}: ${stderrOutput}`.trim()
          )
        );
      }
    });
  });
}

function runRefreshIndices() {
  return new Promise((resolve, reject) => {
    const child = exec('yarn start indices refresh', { cwd: projectRoot });

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    child.on('error', (err) => {
      console.error(`Error executing command: ${err.message}`);
      reject(err);
    });
  });
}

const outputDir = path.join(projectRoot, 'data');
module.exports = async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const downloadPromises = Object.entries(mapping).map(
    async ([tableName, url]) => {
      const outputPath = path.join(outputDir, tableName + '.csv');
      await downloadFile(url, outputPath);
      await runChildImport(tableName);
      return tableName;
    }
  );

  const results = await Promise.allSettled(downloadPromises);
  fs.writeFileSync(
    path.join(outputDir, `results-${new Date()}.json`),
    JSON.stringify(results)
  );
  if (results.every((res) => res.status === 'fulfilled')) {
    try {
      await runRefreshIndices();
    } catch (error) {
      fs.writeFileSync(
        path.join(outputDir, `errors-${new Date()}.json`),
        JSON.stringify(error)
      );
    }
  }
};
