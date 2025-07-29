const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const salesforceRoutes = require('./routes/salesforce');
const searchRoute = require('./routes/search'); // ✅ MCP-compatible route
const toolsManifest = require('./tools-manifest'); // ✅ Exposes /openai-tools.json

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve tool manifest at /openai-tools.json
app.use('/', toolsManifest);

// ✅ Health check route
app.get('/', (req, res) => res.type('text/plain').send('OK the MCP server is alive'));

// ✅ Routes for Salesforce and search
app.use('/search', searchRoute);
app.use('/salesforce', salesforceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  consol