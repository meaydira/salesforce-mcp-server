const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    res.setHeader('Content-Type', 'application/json');

    if (!query || typeof query !== 'string') {
      return res.status(200).json({ items: [] }); // Return empty items array if missing or malformed
    }

    const items = [
      {
        id: "001-fake",
        title: `Result for "${query}"`,
        snippet: "This is a dummy result from the Salesforce MCP server.",
        url: "https://example.com/account/001-fake"
      }
    ];

    return res.status(200).json({ items });
  } catch (err) {
    // MCP requires a valid JSON response no matter what
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ items: [] });
  }
});

module.exports = router;
