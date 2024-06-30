import { exec } from 'child_process';
import os from 'os';

const MAX_CPU_PERCENTAGE = 70; // Max CPU percentage threshold

setInterval(() => {
  const cpuUsage = os.loadavg()[0]; // Get the current CPU usage

  console.log(`Current CPU Usage: ${cpuUsage.toFixed(2)}%`);

  if (cpuUsage > MAX_CPU_PERCENTAGE) {
    console.log(`CPU Usage exceeds ${MAX_CPU_PERCENTAGE}%. Restarting server...`);

    // Restart server command (adjust as per your deployment method)
    exec('pm2 restart server.js', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error restarting server: ${err}`);
      } else {
        console.log(`Server restarted successfully: ${stdout}`);
      }
    });
  }
}, 5000); // Check every 5 seconds (adjust as needed)



