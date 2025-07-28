const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const salesforceRoutes = require('./routes/salesforce');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/salesforce', salesforceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});