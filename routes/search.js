const express = require('express');
const router = express.Router();

// MCP-compatible POST /search
router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: 'Missing query' });
  }

  const items = [
    {
      id: "001-fake",
      title: `Sample result for "${query}"`,
      snippet: "This is a placeholder result returned from the MCP server.",
      url: "https://example.com/account/001-fake"
    }
  ];

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ items });
});

// Optional root GET to help with connector checks
router.get('/', (req, res) => {
  res.send('MCP /search endpoint is live.');
});

module.exports = router;
