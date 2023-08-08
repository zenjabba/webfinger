const express = require("express");
const app = express();
const port = 3000;

// Array of valid resources
const vaildEmails = process.env.VALID_EMAILS.split(",");

app.get("/webfinger", (req, res) => {
  // Extract the "resource" query parameter from the request
  const resource = decodeURIComponent(req.query.resource);

  // Check if the resource is valid
  if (vaildEmails.includes(resource)) {
    const response = {
      subject: `acct:${resource}`,
      links: [
        {
          rel: "http://openid.net/specs/connect/1.0/issuer",
          href: process.env.RESPONSE_URL,
        },
      ],
    };
    try {
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  } else {
    // Return a 500 error if the resource is invalid
    res.status(500).send("Access Denied");
  }
});

app.get("/", (req, res) => {
  res.status(500).send("Access Denied");
});

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
