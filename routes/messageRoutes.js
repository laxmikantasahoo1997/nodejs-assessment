import express from 'express';
import { scheduleMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post('/scheduleMessage', scheduleMessage);

export default router;
