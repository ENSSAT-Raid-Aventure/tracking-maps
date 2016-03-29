//Déclaration des dépendances
var http = require('http');
var url = require('url');
var querystring = require('querystring');
data = require('./js/back-end/data');
d3 = require('d3');
var app = require('express')();
var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var server = http.Server(app);
var io = require('socket.io').listen(server);
_ = require('underscore');
var fs = require('fs');
function_js = require('./js/back-end/function');
var api = require('./routes/api.js')(app);

//Définition et initialisation variables serveur
var clients = [];

var timeIntervalUpdate = 1000;
var index_test = 0;
var jsonLeguer = undefined;
var url = "./exemple_carte/halage1.json";
var file = null;
var tableau_data = [];

var adresseIPAutoriséeAPI = "::1"

    /*var circle_data = [
      [20,25,20]
    ];
    var circle_data_2 = [
      [20,25,10]
    ]
    var triangle_data = [
      [
        [0.25,29],
        [39.75,29],
        [20,25+60]
      ]
    ]
    cloud1 = d3.select("#positionSVG");
    var group = cloud1.append('g')
    .style("opacity", 0.5)
    .style("fill", "steelblue");
    group.selectAll('circles')
      .data(circle_data).enter()
      .append("circle")
      .attr("class","cloud1")
      .attr("cx", function(d){return d[0]})
      .attr("cy", function(d){return d[1]})
      .attr("r", function(d){return d[2]})
      //.style("fill", "steelblue");
    group.selectAll("triangle")
      .data(triangle_data).enter()
      .append("polygon")
      .attr("points", function(d){ return d[0][0] + "," + d[0][1] + " " + d[1][0] + "," + d[1][1] + " " + d[2][0] + "," + d[2][1]; })
      //.style("fill", "steelblue")
      //.style("fill-opacity", 0.5);
    cloud1.selectAll('circles')
      .data(circle_data_2).enter()
      .append("circle")
      .attr("class","cloud1")
      .attr("cx", function(d){return d[0]})
      .attr("cy", function(d){return d[1]})
      .attr("r", function(d){return d[2]})
      .style("fill", "white")
      .style("fill-opacity", 1);*/
fs.readFile(url,function(err,data){
  if(err) throw err;
  file = JSON.parse(data);
  tableau_data = function_js.get_customGeometryJSON(file,"coordinates");
});
//Lancement serveur
server.listen(8080);


//Définition des routes
app.get("/maps", function(req,res){
  res.setHeader('Content-type','text/html');
  res.sendFile('./html/index.html', {root: __dirname });
});
app.get("/css/style.css",function(req,res){
  res.setHeader('Content-type','text/css');
  res.sendFile('./css/style.css', {root: __dirname });
});
app.get("/js/script.js",function(req,res){
  res.setHeader('Content-type','text/javascript');
  res.sendFile('./js/front-end/script.js', {root: __dirname });
});
app.get("/circuit.json",function(req,res){
  res.setHeader('Content-type','text/javascript');
  res.sendFile('./carte_eric/leguer.json', {root: __dirname });
});
app.get("/img/blue.svg",function(req,res){
  res.setHeader('Content-type','image/svg+xml');
  res.sendFile('./images/blue.svg', {root: __dirname });
});
app.get("/img/icon.svg/:color",function(req,res){
  res.setHeader('Content-type','image/svg+xml');
  //{{color}}
  fs.readFile('./images/icon.svg',function(err,data){
    if(!err) res.send(data.toString().replace("{{color}}", "#" + req.params.color));
  });
  //res.sendFile('./images/icon.svg', {root: __dirname });
});




io.on('connection',function(socket){
  //On ajoute à la liste des sockets (utilisé pour le broadcast)
  var data_user = { socket : socket, infos : {}};
  clients.push(data_user);
  console.log("Nouveau client");
  socket.on("classement-perso",function(data){
    console.log(data);
  });
  socket.on("disconnect",function(data){
    var i = clients.indexOf(data_user);
    clients.splice(i, 1);
    console.log("Deconnexion d'un client")
  });
});


sendBroadcast = function (eventName, data){
  for(i = 0; i < clients.length; i ++)
    clients[i].socket.emit(eventName,data);
  return true;
}

function sendToSocket(){}

function getDataUser(user_id){}

function update(){
  if(index_test < tableau_data.length){
    sendBroadcast("classement-update", tableau_data[index_test]);
  }else{
    index_test = 0;
  }
  index_test ++ ;
}

var intervallUpdate = setInterval(function(){
  update();
}
,timeIntervalUpdate);
