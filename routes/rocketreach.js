const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Lookup RocketReach contact by LinkedIn or by name and company
router.get('/lookup', async (req, res) => {
  const { name, company, linkedin } = req.query;

  if (!linkedin && (!name || !company)) {
    return res.status(400).json({ error: 'Provide either linkedin or (name and company)' });
  }

  try {
    const apiKey = process.env.ROCKETREACH_API_KEY;

    const apiUrl = linkedin
      ? `https://api.rocketreach.co/v1/api/lookupProfile?api_key=${apiKey}&linkedin_url=${encodeURIComponent(linkedin)}`
      : `https://api.rocketreach.co/v1/api/lookupProfile?api_key=${apiKey}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}`;

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
