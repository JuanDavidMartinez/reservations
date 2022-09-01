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
