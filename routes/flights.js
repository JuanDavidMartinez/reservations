var express = require('express');
var connection = require('../database/flights_query');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var origen = req.query.origen;
  var destino = req.query.destino;
  var salida = req.query.salida;
  var retorno = req.query.retorno;
  if (!origen || !destino || !salida) {
    res.send({ message: "Debe enviar un origen, destino y salida validos" });
  } else {
    var response = {}
    connection.getFlights(origen, destino, salida)
      .then(function (data) {
        console.log('Flights');
        response.ida = data;
        if (!retorno) {
          console.log('Solo ida');
          res.send(response);
        } else {
          connection.getFlights(destino, origen, retorno)
            .then(function (data) {
              console.log('Ida y Vuelta');
              response.regreso = data;
              res.send(response);
            });
        }
      });
  }
});

module.exports = router;
