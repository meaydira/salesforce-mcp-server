const express = require('express');
const jsforce = require('jsforce');
const router = express.Router();

// Reusable login function
async function connect() {
  const conn = new jsforce.Connection({ loginUrl: 'https://autotech.my.salesforce.com' });
  await conn.login(
    process.env.USERNAME,
    process.env.PASSWORD + process.env.SECURITY_TOKEN
  );
  return conn;
}

// Whoami
router.get('/whoami', async (req, res) => {
  try {
    const conn = await connect();
    const userInfo = await conn.identity();
    res.json(userInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generic SOQL query
router.get('/query', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing SOQL query' });

  try {
    const conn = await connect();
    const result = await conn.query(q);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Account by ID
router.get('/account/:id', async (req, res) => {
  try {
    const conn = await connect();
    const record = await conn.sobject("Account").retrieve(req.params.id);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a Lead
router.post('/lead', async (req, res) => {
  try {
    const conn = await connect();
    const result = await conn.sobject("Lead").create(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Contact by ID
router.patch('/contact/:id', async (req, res) => {
  try {
    const conn = await connect();
    const result = await conn.sobject("Contact").update({
      Id: req.params.id,
      ...req.body
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
