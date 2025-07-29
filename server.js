const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const salesforceRoutes = require('./routes/salesforce');
const searchRoute = require('./routes/search'); // ✅ MCP-compatible route

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.type('text/plain').send('OK the MCP server is alive'));

app.use('/.well-known', require('./routes/tools-manifest'));  // manifest endpoint
app.use('/search', searchRoute);
app.use('/salesforce', salesforceRoutes); // Internal admin endpoints

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
