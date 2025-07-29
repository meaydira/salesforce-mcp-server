const express = require('express');
const router = express.Router();

router.get('/openai-tools.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    tools: [
      {
        name: "search",
        description: "Search Salesforce accounts",
        path: "/search",
        method: "POST",
        input: {
          query: "string"
        },
        output: {
          items: [
            {
              id: "string",
              title: "string",
              snippet: "string",
              url: "string"
            }
          ]
        }
      }
    ]
  });
});

module.exports = router;
