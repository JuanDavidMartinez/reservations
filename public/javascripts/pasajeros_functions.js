$(function () {
  $('#demo').steps({
    onFinish: function () { console.log(getUrlVars()); },
    onInit: function () {
      var argMap = getUrlVars();
      var adults = argMap.get("a");
      var ninos = argMap.get("n");
      var infantes = argMap.get("i");
      var totalPasajeros = adults + ninos + infantes;
      var header = $('#step_header');
      var content = $('#step_content');
      for (var i = 0; i < totalPasajeros; i++) {
        header.append('<li data-step-target="step1">Pasajero ' + (i + 1) + '</li>');
        content.append("<div class='step-tab-panel' data-step='step1'>" +
          "<label>Tipo Documento:</label><input id='tipodoc_"+i+"'/><br>" +
          "<label>Documento:</label><input id='doc_"+i+"'/><br>" +
          "<label>Nombre:</label><input id='nombre_"+i+"'/><br>" +
          "<label>Apellido:</label><input id='apellido_"+i+"'/><br>" +
          "<label>Fecha Nacimiento:</label><input id='nacimiento_"+i+"'/><br>" +
          "<label>Nacionalidad:</label><input id='nacionalidad_"+i+"'/><br>" +
          "<label>Fecha Expiracion Visa:</label><input id='visa_"+i+"'/>" +
          "</div>");
      }
      $('#finish').append();
    }
  });

  $('#finish').on('click', function () {
      
  });
});

function getUrlVars() {
  const map = new Map();
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    var hash = hashes[i].split('=');
    map.set(hash[0], Number(hash[1]));
  }
  return map;
}