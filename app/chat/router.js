const router = require('express').Router();
const bodyParser = require('body-parser')
const checkJwt = require('../jwt');

const jsonParser = bodyParser.json();

const checkin = (req, res) => {
  console.log(req.body);
  res.json({peers: ['tom', 'jack', 'rachel']});
};

router.post('/checkin', checkJwt, jsonParser, checkin);

module.exports = router;
