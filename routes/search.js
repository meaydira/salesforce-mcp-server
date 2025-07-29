// routes/search.js
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query) return res.status(400).json({ error: 'Missing query' });

  const items = [
    {
      id: "001-fake",
      title: `Sample for "${query}"`,
      snippet: "This is a placeholder result",
      url: "https://example.com"
    }
  ];

  res.json({ items });
});

module.exports = router;