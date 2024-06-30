import express from 'express';
import connectDB from './configs/database.js';
import policyRoutes from './routes/policyRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import { checkCPUUsageInterval } from './utils/cpuUsesCheck.js';

const app = express();
connectDB();

app.use(express.json());

app.use('/api/policies', policyRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/uploadFile', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    checkCPUUsageInterval();
});
