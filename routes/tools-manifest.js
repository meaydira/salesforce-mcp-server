const express = require('express');
const router = express.Router();

router.get('/openai-tools.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    schema_version: "v1",
    name_for_human: "Salesforce MCP Server",
    name_for_model: "salesforce_mcp",
    description_for_model: "Fetch and update Salesforce data including accounts, contacts, leads, and chatter comments.",
    auth: {
      type: "api_key",
      authorization_type: "custom",
      verification_tokens: {}
    },
    api: {
      type: "openapi",
      url: "https://salesforce-mcp-server-seven.vercel.app/openapi.yaml"
    },
    logo_url: "https://salesforce-mcp-server-seven.vercel.app/logo.png", // optional
    contact_email: "support@example.com",
    legal_info_url: "https://example.com/legal" // optional
  });
});

module.exports = router;
