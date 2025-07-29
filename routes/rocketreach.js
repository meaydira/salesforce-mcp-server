const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Lookup RocketReach contact by name and company
router.get('/lookup', async (req, res) => {
  const { name, company } = req.query;

  if (!name || !company) {
    return res.status(400).json({ error: 'Missing name or company' });
  }

  try {
    const apiKey = process.env.ROCKETREACH_API_KEY;
    const apiUrl = `https://api.rocketreach.co/v1/api/lookupProfile?api_key=${apiKey}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('RocketReach API error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
