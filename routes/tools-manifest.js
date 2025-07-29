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
      },
      {
        name: "updateAccount",
        description: "Update Salesforce Account fields by ID",
        path: "/salesforce/account/:id",
        method: "PATCH",
        input: {
          id: "string",
          Website: "string",
          BillingCity: "string",
          BillingCountry: "string",
          AIM__Sector__c: "string",
          One_Liner__c: "string",
          Products_Services__c: "string",
          Strategic_Initiatives__c: "string",
          Recent_Investments__c: "string"
        },
        output: {
          id: "string",
          success: "boolean"
        }
      }
    ]
  });
});

module.exports = router;
