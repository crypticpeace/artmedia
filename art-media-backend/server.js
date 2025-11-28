// server.js - Final (DB-tolerant) server file
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// === Middleware ===
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// === Routes ===
try {
  const apiRouter = require('./routes/api');
  app.use('/api', apiRouter);
  console.log('ℹ️  Mounted routes from ./routes/api -> /api');
} catch (err) {
  console.warn('⚠️  Could not load ./routes/api. Ensure routes/api.js exists. Error:', err.message);
}

// Health-check
app.get('/', (req, res) => {
  res.json({
    message: 'Art Media Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      submitContact: 'POST /api/contact',
      getSubmissions: 'GET /api/contact/submissions'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    success: false,
    error: isProd ? 'Something went wrong' : err.message,
    stack: isProd ? undefined : err.stack
  });
});

// 404 handler (keep last)
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found', requestedUrl: req.originalUrl });
});

// === Start server regardless of DB (helpful in dev) ===
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });
};

if (!MONGO_URI) {
  console.warn('⚠️  No MONGODB_URI found in environment. Starting server without DB connection.');
  startServer();
} else {
  // IMPORTANT: do not pass legacy/unsupported driver options here
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
      startServer();
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message || err);
      console.warn('⚠️  Starting server anyway (DB unavailable). Fix MONGODB_URI or Mongo server to enable DB features.');
      startServer();
    });
}
