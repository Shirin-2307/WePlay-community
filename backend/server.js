// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db');

const app = express();

// ----- CORS setup (safe + supports Vercel previews) -----
const allowedList = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow same-origin / server-to-server / curl (no origin header)
    if (!origin) return callback(null, true);

    // allow exact origins from env
    if (allowedList.includes(origin)) return callback(null, true);

    // allow any Vercel preview or production domain
    if (origin.endsWith('.vercel.app')) return callback(null, true);

    return callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// ---------------------------------------------------------

app.use(express.json());

// Health check
app.get('/', (_req, res) => res.send('🎾 SportConnect API is running!'));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/activities', require('./src/routes/activities'));

// Start server after DB connects
const PORT = process.env.PORT || 3001;

(async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`✅ MongoDB connected`);
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
})();
