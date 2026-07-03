import express from 'express';
import { config } from '../config/env.js';
const healthController = require('../controllers/healthController')

const healthRouter = express.Router();

// GET/health
healthRouter.get("/health",  (req,res) => {
    return res.status(200).json({
        status: "ok",
        timestamp: new Date(),
        uptime: process.uptime(),
        environment: config.nodeEnv,

    })
});

export default healthRouter;