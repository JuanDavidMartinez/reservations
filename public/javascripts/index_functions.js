var dataTableColums = {
  columns: [
    { data: 'vuelo_id' },
    { data: 'fecha_salida' },
    { data: 'hora_salida' },
    { data: 'fecha_llegada' },
    { data: 'hora_llegada' },
    { data: 'vuelo_numero' },
    { data: 'ciudad_origen' },
    { data: 'ciudad_destino' },
    { data: 'precio' },
    { data: 'moneda' },
    { data: 'numero_escalas' }
  ],
  info: false,
  searching: false,
  paging: false
};

$(function () {
  console.log("ready!");
  //Carga ciudades para seleccionar
  $.get("/cities", function (data) {
    data.forEach(element => {
      console.log(element);
      $('#ciudad_origen').append('<option value="' + element.id_ciudad + '">' + element.nombre + '</option>');
    });
  });
  //Carga datepicker
  $("#fecha_salida").datepicker({ dateFormat: 'yy-mm-dd' });
  $("#fecha_retorno").datepicker({ dateFormat: 'yy-mm-dd' });
  //Carga dataTable
  $("#tablaIda").DataTable(dataTableColums);
  $("#tablaRetorno").DataTable(dataTableColums);
});

function getCitiesByOrigin() {
  var ciudad_origen = $('#ciudad_origen').val();
  $('#ciudad_destino').html("");
  $.get("/cities?origen=" + ciudad_origen, function (data) {
    data.forEach(element => {
      console.log(element);
      $('#ciudad_destino').append('<option value="' + element.id_ciudad + '">' + element.nombre + '</option>');
    });
  });
}

function deshabilitarRetorno() {
  $('#label_retorno').hide();
  $('#fecha_retorno').hide();
  $('#label_t_retorno').hide();
  $('#tablaRetorno').hide();
}

function habilitarRetorno() {
  $('#label_retorno').show();
  $('#fecha_retorno').show();
  $('#label_t_retorno').show();
  $('#tablaRetorno').show();
}

function buscarVuelos() {
  var datatableIda = $("#tablaIda").DataTable();
  var datatableRetorno = $("#tablaRetorno").DataTable();
  datatableIda.clear();
  datatableRetorno.clear();

  var origen = $('#ciudad_origen').val();
  var destino = $('#ciudad_destino').val();
  var salida = $('#fecha_salida').val();
  var retorno = $('#fecha_retorno').val();
  var url = "/flights?origen=" + origen + "&destino=" + destino + "&salida=" + salida;
  if (retorno) {
    url = url + "&retorno=" + retorno;
  }
  $.get(url, function (data) {
    datatableIda.rows.add(data.ida);
    datatableIda.draw();
    datatableRetorno.rows.add(data.regreso);
    datatableRetorno.draw();
  });
}