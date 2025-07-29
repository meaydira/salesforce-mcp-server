const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const salesforceRoutes = require('./routes/salesforce');
const mcpSearch = require('./routes/search'); //  New MCP-compatible route

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/salesforce', salesforceRoutes);
app.use('/search', mcpSearch); //  MCP tool endpoint

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
