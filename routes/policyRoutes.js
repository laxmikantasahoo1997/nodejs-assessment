import express from 'express';
import { getPolicyAggregation, getPolicyInfoByUsername } from '../controllers/policyController.js';

const router = express.Router();

// Route to get aggregated policies
router.get('/aggregated', getPolicyAggregation);
// Route to search policy info by username
router.get('/search', getPolicyInfoByUsername);

export default router;
