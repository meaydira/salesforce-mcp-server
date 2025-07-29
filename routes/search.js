const express = require('express');
const jsforce = require('jsforce');
const router = express.Router();

async function connect() {
  const conn = new jsforce.Connection({ loginUrl: 'https://autotech.my.salesforce.com' });
  await conn.login(process.env.USERNAME, process.env.PASSWORD + process.env.SECURITY_TOKEN);
  return conn;
}

router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(200).json({ items: [] });
  }

  try {
    const conn = await connect();
    const result = await conn.query(
      `SELECT Id, Name, Website FROM Account WHERE Name LIKE '%${query}%' LIMIT 20`
    );

    const items = result.records.map(account => ({
      id: account.Id,
      title: account.Name,
      snippet: account.Website || 'No website provided',
      url: `https://autotech.my.salesforce.com/${account.Id}`
    }));

    return res.status(200).json({ items });
  } catch (err) {
    console.error('Salesforce search error:', err);
    return res.status(200).json({ items: [] });
  }
});

module.exports = router;
