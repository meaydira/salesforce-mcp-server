const express = require('express');
const jsforce = require('jsforce');
const router = express.Router();

// Salesforce login
async function connect() {
  const conn = new jsforce.Connection({ loginUrl: 'https://autotech.my.salesforce.com' });
  await conn.login(
    process.env.USERNAME,
    process.env.PASSWORD + process.env.SECURITY_TOKEN
  );
  return conn;
}

// MCP-compliant POST /search endpoint
router.post('/', async (req, res) => {
  const query = req.body.query;
  if (!query) {
    return res.status(400).json({ error: 'Missing query string' });
  }

  try {
    const conn = await connect();
    const result = await conn.query(`
      SELECT Id, Name, Description 
      FROM Account 
      WHERE Name LIKE '%${query}%' 
      LIMIT 5
    `);

    const items = result.records.map(rec => ({
      id: rec.Id,
      title: rec.Name,
      snippet: rec.Description || 'No description available',
      url: `https://${conn.instanceUrl}/lightning/r/Account/${rec.Id}/view`
    }));

    res.json({ items });
  } catch (err) {
    console.error('[Salesforce MCP Search Error]', err);
    res.status(500).json({ error: 'Salesforce search failed' });
  }
});

module.exports = router;