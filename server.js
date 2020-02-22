const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Create a new Express app
const app = express();

const cors = require('cors');
app.use(cors());

// Set up Auth0 configuration
const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
};

// Define middleware that validates incoming bearer tokens
// using JWKS from process.env.AUTH0_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// Define an example endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
    peers: [1, 2, 3],
  });
});

// Start the app
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API listening on ${port}.`));
