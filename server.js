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

// ❌ Removed OAuth middleware

// ✅ Mount all API routes directly (no auth)
app.use('/search', searchRoute);
app.use('/salesforce', salesforceRoutes);
app.use('/rocketreach', rocketReachRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
