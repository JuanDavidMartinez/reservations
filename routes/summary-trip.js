var express = require('express');
var connection = require('../database/flights_query');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  var requestBody = req.body;
  var cantidadPasajeros = requestBody.pasajeros.length;
  connection.getFlightById(requestBody.vuelo_id_salida)
    .then(function (dataIda) {
      var valorTortal;
      if (requestBody.vuelo_id_regreso) {
        connection.getFlightById(requestBody.vuelo_id_regreso)
          .then(function (dataRetorno) {
            valorTortal = (dataIda[0].precio + dataRetorno[0].precio) * cantidadPasajeros
            res.send({
              cantidadPasajeros: cantidadPasajeros,
              precioIda: dataIda[0].precio * cantidadPasajeros,
              precioRegreso: dataRetorno[0].precio * cantidadPasajeros,
              total: valorTortal
            });
          });
      } else {
        valorTortal = dataIda[0].precio * cantidadPasajeros
        res.send({
          cantidadPasajeros: cantidadPasajeros,
          precioIda: valorTortal,
          total: valorTortal
        });
      }
    })
});

module.exports = router;
