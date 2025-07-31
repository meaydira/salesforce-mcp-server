const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const salesforceRoutes = require('./routes/salesforce');
const searchRoute = require('./routes/search');
const toolsManifest = require('./routes/tools-manifest'); // Assuming this is the right path
const rocketReachRoute = require('./routes/rocketreach'); // ✅ NEW

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ OAuth Bearer token middleware for ChatGPT connector
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Bearer token' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Bearer token:', token); // 🔒 Don’t log this in prod

  // TODO: validate token against Auth0 (optional)
  req.user = { token };
  next();
});

// ✅ Health check route
app.get('/', (req, res) => res.type('text/plain').send('OK the MCP server is alive'));

// ✅ Mount API routes
app.use('/search', searchRoute);
app.use('/salesforce', salesfor
