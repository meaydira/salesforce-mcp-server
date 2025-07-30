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

// ✅ Minimal addition for ChatGPT API key requirement
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log('Received x-api-key:', apiKey || '(none)');
  next();
});

// ✅ Health check route
app.get('/', (req, res) => res.type('text/plain').send('OK the MCP server is alive'));

// ✅ Mount API routes first
app.use('/search', searchRoute);
app.use('/salesforce', salesforceRoutes);
app.use('/rocketreach', rocketReachRoute); // ✅ NEW

// ✅ Mount manifest route last to prevent override
app.use('/.well-known', toolsManifest);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
