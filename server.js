const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const salesforceRoutes = require('./routes/salesforce');
const searchRoute = require('./routes/search'); // ✅ MCP-compatible route

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Optional root route for sanity checks (used by MCP validation)
app.get('/', (req, res) => {
  res.send('Salesforce MCP server is up and running.');
});

// Routes
app.use('/salesforce', salesforceRoutes); // Internal admin endpoints
app.use('/search', searchRoute);          // ✅ MCP-compatible tool endpoint

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
