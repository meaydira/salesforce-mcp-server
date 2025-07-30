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
      },
      {
        name: "createAccount",
        description: "Create a new Salesforce Account",
        path: "/salesforce/account",
        method: "POST",
        input: {
          Name: "string",
          Website: "string",
          BillingCity: "string",
          BillingCountry: "string",
          AIM__Sector__c: "string",
          One_Liner__c: "string",
          Products_Services__c: "string",
          Strategic_Initiatives__c: "string",
          Recent_Investments__c: "string",
 	  RecordTypeId": "string"

        },
        output: {
          id: "string",
          success: "boolean"
        }
      },
      {
        name: "createContact",
        description: "Create a new Salesforce Contact",
        path: "/salesforce/contact",
        method: "POST",
        input: {
          FirstName: "string",
          LastName: "string",
          Email: "string",
          AccountId: "string"
        },
        output: {
          id: "string",
          success: "boolean"
        }
      },
      {
        name: "updateContact",
        description: "Update Salesforce Contact fields by ID",
        path: "/salesforce/contact/:id",
        method: "PATCH",
        input: {
          id: "string",
          Title: "string",
          AIM__LinkedIn_URL__c: "string",
	  LinkedIn__c: "string"
        },
        output: {
          id: "string",
          success: "boolean"
        }
      },
      {
        name: "createLead",
        description: "Create a new Salesforce Lead",
        path: "/salesforce/lead",
        method: "POST",
        input: {
          FirstName: "string",
          LastName: "string",
          Company: "string",
          Email: "string",
          Status: "string"
        },
        output: {
          id: "string",
          success: "boolean"
        }
      },
      {
        name: "getAccountById",
        description: "Retrieve a Salesforce Account by ID",
        path: "/salesforce/account/:id",
        method: "GET",
        input: {
          id: "string"
        },
        output: {
          Id: "string",
          Name: "string",
          Website: "string",
          BillingCity: "string",
          BillingCountry: "string"
        }
      },
      {
        name: "soqlQuery",
        description: "Execute a raw SOQL query",
        path: "/salesforce/query",
        method: "GET",
        input: {
          q: "string"
        },
        output: {
          records: "array"
        }
      },
      {
        name: "postChatterComment",
        description: "Post a comment to the Chatter feed of an Account or other Salesforce object",
        path: "/salesforce/chatter/post",
        method: "POST",
        input: {
          parentId: "string",
          body: "string"
        },
        output: {
          success: "boolean",
          id: "string"
        }
      }
	
    ]
  });
});

module.exports = router;
