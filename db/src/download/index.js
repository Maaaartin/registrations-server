const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
const mapping = require('./mapping.json');

const projectRoot = path.resolve(__dirname, '..', '..');
async function downloadFile(tableName, url, outputPath) {
  return new Promise((resolve, reject) => {
    // Use shell: true so we can use shell features like `>>`
    const curl = spawn(`curl "${url}" >> "${outputPath}"`, {
      shell: true
    });

    // Live logging
    curl.stdout.on('data', (data) => {
      process.stdout.write(`[curl ${tableName}] ${data}`);
    });

    curl.stderr.on('data', (data) => {
      process.stderr.write(`[curl ${tableName} ERROR] ${data}`);
    });

    curl.on('error', (err) => {
      reject(new Error(`[curl ${tableName}] Failed to start: ${err.message}`));
    });

    curl.on('close', (code) => {
      if (code === 0) {
        console.log(`[curl ${tableName}] Download complete.`);
        resolve();
      } else {
        reject(new Error(`[curl ${tableName}] curl exited with code ${code}`));
      }
    });
  });
}

function runChildImport(tableName) {
  return new Promise((resolve, reject) => {
    const child = spawn('yarn', ['start', 'import', tableName], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true
    });

    child.on('error', (err) => {
      reject(new Error(`Worker ${tableName} failed to start: ${err.message}`));
    });

    // Handle process exit
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Worker ${tableName} exited with code ${code}`));
      }
    });
  });
}

function runRefreshIndices() {
  return new Promise((resolve, reject) => {
    const child = exec('yarn start indices refresh', { cwd: projectRoot });

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

  const results = [];
  const importPromises = [];

  for (const { tableName, url } of mapping) {
    try {
      const outputPath = path.join(outputDir, tableName + '.csv');
      await downloadFile(tableName, url, outputPath);
      results.push({ name: 'download', tableName });
      const importPromise = runChildImport(tableName)
        .then(() => {
          results.push({ name: 'import', tableName });
          const outputPath = path.join(outputDir, tableName + '.csv');
          return fs.promises.rm(outputPath);
        })
        .catch((error) => {
          results.push({ name: 'import', tableName, error });
        });
      importPromises.push(importPromise);
      await importPromise;
    } catch (error) {
      console.log(error);
      results.push({ name: 'download', tableName, error });
    }
  }
  await Promise.allSettled(importPromises);

  fs.writeFileSync(
    path.join(outputDir, `results-${new Date()}.json`),
    JSON.stringify(results)
  );

  if (results.every((res) => !res.error)) {
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
