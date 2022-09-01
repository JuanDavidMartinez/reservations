var connection = require('./connection');

var queryGetFlights = "select v.vuelo_id, v.fecha_salida, v.hora_salida, v.fecha_llegada," +
    "v.hora_llegada, v.vuelo_numero, c.nombre as ciudad_origen, c2.nombre as ciudad_destino," +
    "v.precio, v.moneda, v.numero_escalas " +
    "from vuelo v " +
    "inner join ciudad c on v.id_ciudad_origen = c.id_ciudad " +
    "inner join ciudad c2 on v.id_ciudad_destino  = c2.id_ciudad " +
    "where v.id_ciudad_origen = $1 and v.id_ciudad_destino = $2";

function getFlights(ciudad_origen, ciudad_destino) {
    return connection.new_connection.any(queryGetFlights, [ciudad_origen, ciudad_destino])
        .then(function (data) {
            console.log(data);
            return data;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
}

function getFlightById(vuelo_id) {
    return connection.new_connection.any("select * from vuelo where vuelo_id = $1", vuelo_id)
        .then(function (data) {
            console.log(data);
            return data;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
}

module.exports = {
    getFlights: getFlights,
    getFlightById: getFlightById
}