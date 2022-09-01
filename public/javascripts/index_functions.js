$(function() {
    console.log( "ready!" );
    //Carga ciudades para seleccionar
    $.get( "/cities", function( data ) {
      data.forEach(element => {
        console.log(element);
        $('#ciudad_origen').append('<option value="'+element.id_ciudad+'">'+element.nombre+'</option>');
      });
    });
    //Carga datepicker
    $( "#fecha_salida" ).datepicker();
    $( "#fecha_retorno" ).datepicker();
    //Carga dataTable
    $( "#dataTable" ).DataTable();
});

function getCitiesByOrigin() {
  var ciudad_origen = $('#ciudad_origen').val();
  $('#ciudad_destino').html("");
  $.get( "/cities?origen="+ciudad_origen, function( data ) {
      data.forEach(element => {
        console.log(element);
        $('#ciudad_destino').append('<option value="'+element.id_ciudad+'">'+element.nombre+'</option>');
      });
    });
}

function deshabilitarRetorno() {
  $('#label_retorno').hide();
  $('#fecha_retorno').hide();
}

function habilitarRetorno() {
  $('#label_retorno').show();
  $('#fecha_retorno').show();
}