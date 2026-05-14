import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from '../security/passport.js';
import router from '../routes/index.js';
import errorMiddleware from '../middlewares/error.js';

dotenv.config();

const createServer = () => {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
  app.use(express.json());
  app.use(passport.initialize());

  app.use('/api', router);

  app.use(errorMiddleware);

  return app;
};

export default createServer;