import express from 'express';
import healthRouter from './routes/health.routes.js';
import jobRouter from './routes/job.routes.js';
import { errorHandler } from './middleware/error.js';

const app = express();

app.use(express.json());

// Routes
app.use('/', healthRouter);
app.use('/api/v1/jobs', jobRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;

