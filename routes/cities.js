var express = require('express');
var connection = require('../database/connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var origin = req.query.origen;
  if (!origin) {
    connection.getCities()
      .then(function (data) {
        console.log('All Cities');
        res.send(data);
      });
  } else {
    connection.getCitiesByOrigin(origin)
      .then(function (data) {
        console.log('Cities by origin');
        res.send(data);
      });
  }

});

module.exports = router;
