const router = require('express').Router();
const bodyParser = require('body-parser');
const { printObject } = require('../utils');
const checkJwt = require('../jwt');
const store = require('./store');

const jsonParser = bodyParser.json();

const checkin = (req, res) => {

  const {user: {name, sub: id}} = req.body;
  store.users[id] = {name, id};

  printObject(store);

  res.json({peers: Object.values(store.users)});
};

router.post('/checkin', checkJwt, jsonParser, checkin);

module.exports = router;
