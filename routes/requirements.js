var express = require('express');
var connection = require('../database/connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var id_ciudad = req.query.ciudad;
  var nacionality = req.query.nacionalidad;
  if (!id_ciudad || !nacionality) {
    res.send({ message: "Debe enviar una ciudad y nacionalidad valida" });
  } else {
    connection.getRequirementsByCity(id_ciudad, nacionality)
      .then(function (data) {
        console.log('All Requirements by city and nacionality');
        res.send(data);
      });
  }
});

module.exports = router;
