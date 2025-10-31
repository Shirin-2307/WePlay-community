require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db');

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(',') || '*' }));
app.use(express.json());

app.get('/', (_, res) => res.send('🎾 SportConnect API is running!'));

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/activities', require('./src/routes/activities'));

const PORT = process.env.PORT || 3001;

(async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
})();
