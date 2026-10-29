require('dotenv').config();

if (process.env.MONGODB_DNS_SERVERS) {
  require('dns').setServers(process.env.MONGODB_DNS_SERVERS.split(',').map(value => value.trim()).filter(Boolean));
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler } = require('./middleware/errors');

const app = express();
let connectionPromise;

function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!process.env.MONGODB_URI) return Promise.reject(new Error('MONGODB_URI is required'));
  if (!connectionPromise) {
    const options = process.env.MONGODB_PROXY_HOST
      ? { proxyHost: process.env.MONGODB_PROXY_HOST, proxyPort: Number(process.env.MONGODB_PROXY_PORT || 1080) }
      : {};
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, options).catch(error => {
      connectionPromise = undefined;
      throw error;
    });
  }
  return connectionPromise;
}

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.get('/', (_req, res) => res.json({ name: 'Campus Life Toolkit API', status: 'running' }));
app.get('/health', (_req, res) => res.json({ status: 'running', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

app.use('/api', async (_req, _res, next) => {
  if (!process.env.JWT_SECRET) return next(new Error('JWT_SECRET is required'));
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/blog', require('./routes/blog'));
app.use(errorHandler);

module.exports = app;

if (require.main === module) {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    console.error('MONGODB_URI and JWT_SECRET are required');
    process.exit(1);
  }
  connectToDatabase()
    .then(() => app.listen(process.env.PORT || 5000, () => console.log('API ready')))
    .catch(error => { console.error(error); process.exit(1); });
}
