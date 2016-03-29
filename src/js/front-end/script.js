(function ( $ ) {
  domainname = "/";
  GetLatLng = function(id){
    if(id != undefined && id != 0){
      var url = domainname + "map/getlatlng?id=" + id;
      $.ajax({
        type: "GET",
        url: url,
        success: function(data){
          console.log(data);
        },
        error: function(){
          throw new Error("Une erreur réseau s'est produite.");
        }
      });
    }
  }

  log = function(message){
    if(window.console)
      console.log(message);
  }

  get_customGeometryJSON = function(json, property,index){
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
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }

  getDistanceLatLng = function(lat1,lon1,lat2,lon2){
    var R = 6371000; // km
    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();
    var x2 = lon2-lon1;
    var dLon = x2.toRad();
    console.log(lat1,lat2);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    //Distance en m
    return d;
  }

  getVitesseMS = function(lat1,lon1,lat2,lon2,temps){
    //temps en ms
    return getDistanceLatLng(lat1,lon1,lat2,lon2) / (temps/1000);
  }

  getVitesseKmH = function(lat1,lon1,lat2,lon2,temps){
    //temps en ms
    return getVitesseMS(lat1,lon1,lat2,lon2,temps) * 3.6;
  }

}( jQuery ));
