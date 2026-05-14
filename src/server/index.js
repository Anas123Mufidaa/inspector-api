import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from '../security/passport.js';
import router from '../routes/index.js';
import errorMiddleware from '../middlewares/error.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

dotenv.config();

const createServer = () => {
  const app = express();

  app.get('/', (_req, res) => {
    const html = readFileSync(join(__dirname, '../../public/index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

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