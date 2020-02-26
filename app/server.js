require('dotenv').config();

const port = process.env.PORT || 3001;

const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.use('/api', require('./chat/router'));

const fs = require('fs');

let server;

if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('ssl-cert/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('ssl-cert/fullchain.pem', 'utf8');

  const credentials = {key: privateKey, cert: certificate};
  const https = require('https');
  server = https.createServer(credentials, app);
  require('./chat/websocket')(server);
  server.listen(port, () => console.log(`API listening on ${port}.`));
} else {
  require('./chat/websocket')(server);
  server = app.listen(port, () => console.log(`Local API listening on ${port}.`));
}

