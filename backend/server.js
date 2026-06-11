import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import analysisRoutes from './routes/analysis.js';
import farmRoutes from './routes/farm.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow all origins
    callback(null, true);
  }, 
  credentials: true 
}));
app.use(express.json({ limit: '15mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'agrimate-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/farm', farmRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`AgriMate API running on http://localhost:${PORT}`);
});
