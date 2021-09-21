var express = require('express');
var router = express.Router();
const Person = require("../models/mongo");
/* GET users listing. */
router.get('/', function(req, res) {
  Person.find({}).then((result) => {
    let number = result.length
    res.render('info',{number, timeReceived: new Date(Date.now()).toString()})
  }).catch((err) => {
    next(err)
  });
  
});

module.exports = router;
