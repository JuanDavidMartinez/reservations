var pgp = require("pg-promise")(/*options*/);

const connectionConf = {
  host: 'ec2-3-93-206-109.compute-1.amazonaws.com',
  port: 5432,
  database: 'deid77rhk6trmi',
  user: 'rftlhnpssqgycp',
  password: '531f4c59bece8d35bde3ecfc7b1635027604af6f1d4abf93062260aaeb467e3a',
  ssl: {
    rejectUnauthorized: false
  }
};

const new_db = pgp(connectionConf);

function getCities() {
  return new_db.any('select * from ciudad')
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
}

var queryCitiesByOrigin = `select c.id_ciudad , c.nombre from ciudad c inner join ciudad_origen_destino cod on c.id_ciudad = cod.id_ciudad_destino where cod.id_ciudad_origen = $1`;

function getCitiesByOrigin(origen) {
  return new_db.any(queryCitiesByOrigin, origen)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
}

function getRequirementsByCity(ciudad, nacionalidad) {
  return new_db.any('select * from requisitos_viaje where id_ciudad = $1 and nacionalidad = $2', [ciudad, nacionalidad])
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
  getCities: getCities,
  getCitiesByOrigin: getCitiesByOrigin,
  getRequirementsByCity: getRequirementsByCity,
  new_connection: new_db
}