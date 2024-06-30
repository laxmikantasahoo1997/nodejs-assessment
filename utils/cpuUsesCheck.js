import os from 'os';
import { spawn } from 'child_process';

// Set the threshold for CPU usage (in percentage)
const cpuThreshold = 70;

// Function to get current CPU usage
function getCPUUsage() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((cpu) => {
    for (const type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  return 100 - (totalIdle / totalTick) * 100;
}

// Function to restart the server
function restartServer() {
  console.log('Restarting server due to high CPU usage...');
  const serverProcess = spawn('node', ['server.js']);

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    
  });
}

// Interval to check CPU usage
export const checkCPUUsageInterval = () => {
  setInterval(() => {
    const cpuUsage = getCPUUsage();
    console.log(`Current CPU Usage: ${cpuUsage.toFixed(2)}%`);

    if (cpuUsage > cpuThreshold) {
      restartServer();
    }
  }, 5000); // Check every 5 seconds
};
