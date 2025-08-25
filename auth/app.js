import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter }  from './routes/authRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.get('/health', (_req, res) => res.json({status: 'ok'}));

app.use('/api/auth', authRouter);
app.use((err, _req, res, _next) => {
  if (err?.issues) return res.status(400).json({ error: 'ValidationError', details: err.issues });
  const status = err?.status || 500;
  res.status(status).json({ error: err?.message || 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));