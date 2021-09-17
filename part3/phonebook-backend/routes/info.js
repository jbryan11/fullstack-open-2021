var express = require('express');
var router = express.Router();
const persons = require('../api/persons.js')
/* GET users listing. */
router.get('/', function(req, res) {
  let number = persons.length
  res.render('info',{number, timeReceived: new Date(Date.now()).toString()})
});

module.exports = router;
