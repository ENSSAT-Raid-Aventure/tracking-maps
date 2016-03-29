module.exports.get_customGeometryJSON = function (json, property,index){
  if(!index)
    index = 0;
  switch(property){
    case "coordinates":
      return json[index].geometry.coordinates;
    case "properties":
      return json[index].geometry.properties;
    case "equipe":
      return json[index].geometry.properties.equipe;
    case "time":
      return json[index].geometry.properties.time;
    case "title":
      return json[index].geometry.properties.title;
    case "teammates":
      return json[index].geometry.properties.teammates;
  }
}
function cliAddress(req) {
  return req.connection.remoteAddress || req.socket.remoteAddress || req.headers['x-forwarded-for'];
}

module.exports.isLocal = function (server, request) {
  return server.address() === cliAddress(request);
}

module.exports.TryParseFloat = function (str) {
  var retValue = 0;
  if(str !== null) {
    if(str.length > 0) {
      if (!isNaN(str)) {
        retValue = parseFloat(str);
      }
    }
  }
  return retValue;
}

module.exports.getDistanceLatLng = function(lat1,lon1,lat2,lon2){
  var R = 6371000; // km
  //has a problem with the .toRad() method below.
  var x1 = lat2-lat1;
  var dLat = x1.toRad();
  var x2 = lon2-lon1;
  var dLon = x2.toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  //Distance en m
  return d;
}

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}
