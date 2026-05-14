import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from '../security/passport.js';
import router from '../routes/index.js';
import errorMiddleware from '../middlewares/error.js';

dotenv.config();

const createServer = () => {
  const app = express();

  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));
  app.use(express.json());
  app.use(passport.initialize());

  app.use('/api', router);

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  app.use(errorMiddleware);

  return app;
};

export default createServer;