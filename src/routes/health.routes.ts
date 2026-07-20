import express from 'express';
import { checkHealth } from '../controllers/health.controllers.js';

const healthRouter = express.Router();

// GET /health
healthRouter.get("/health", checkHealth);

export default healthRouter;