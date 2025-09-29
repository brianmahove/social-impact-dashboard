 import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dataRoutes from './routes/dataRoutes.js';
import { initDB } from './database/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// Routes
app.use('/api/data', dataRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Social Impact API is running' });
});

// Get database info
app.get('/api/db-info', async (req, res) => {
  try {
    res.json({ 
      database: 'SQLite', 
      message: 'Database running successfully',
      features: ['No setup required', 'Lightweight', 'File-based']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 SQLite database initialized`);
  console.log(`🌍 Health check: http://localhost:${PORT}/api/health`);
}); 