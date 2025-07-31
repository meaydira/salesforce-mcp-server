const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const salesforceRoutes = require('./routes/salesforce');
const searchRoute = require('./routes/search');
const toolsManifest = require('./routes/tools-manifest');
const rocketReachRoute = require('./routes/rocketreach');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Health check route (no auth)
app.get('/', (req, res) => res.type('text/plain').send('OK the MCP server is alive'));

// ✅ Mount manifest route (no auth)
app.use('/.well-known', toolsManifest);

// ✅ Serve openapi.yaml (no auth)
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'openapi.yaml'));
});

// ✅ OAuth middleware (only for API routes)
const bearerMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Bearer token' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Bearer token:', token); // ⚠️ Avoid logging this in production
  req.user = { token };
  next();
};

// ✅ Mount authenticated API routes
app.use('/search', bearerMiddleware, searchRoute);
app.use('/salesforce', bearerMiddleware, salesforceRoutes);
app.use('/rocketreach', bearerMiddleware, rocketReachRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
