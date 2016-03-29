var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var database = undefined;
var connected = false;
var url = "mongodb://valentin-boucher.fr:27017/raid";
var Q = require('q');
var mongoose = require('mongoose');


function connection(callback){
  var d = Q.defer();
  MongoClient.connect(url, function(error, db_) {
    if(error == null){
      database = db_;
      callback().then( function(){disconnect()} )
    }else{
      console.log("erreur lors de la connexion à la BDD : ")
      console.log(error);
    }
  })
};

function findWhere(collection, conditions, callback){
  var promise = Q.defer();
  connection(function(){
    var d2 = Q.defer();
    var result = database.collection(collection).find(conditions);
    result.toArray(function(error,datas){
      callback(error,datas);
      d2.resolve();
      promise.resolve();
    });
    return d2.promise;
  });
  return promise.promise;
}

function addData(collection, data, callback){
  var promise = Q.defer();
  connection(function(){
    var d2 = Q.defer();
    var result = database.collection(collection).insertOne(data, function(error,datas){
        console.log(error);
        callback(error,datas);
        d2.resolve();
        promise.resolve();
      }
    );
    return d2.promise;
  });
  return promise.promise;
}

function removeManyData(collection, conditions, callback){
  var promise = Q.defer();
  //obligation de parser l'objet en ObjectId, la string ne fonctionne pas
  if(conditions._id != null && conditions._id != undefined)
    conditions._id = mongoose.Types.ObjectId(conditions._id);
  connection(function(){
    var d2 = Q.defer();
    console.log(conditions);
    var result = database.collection(collection).deleteMany(conditions, function(error,datas){
        console.log(error);
        console.log(datas.result);
        callback(error,datas);
        d2.resolve();
        promise.resolve();
      }
    );
    return d2.promise;
  });
  return promise.promise;
}

function disconnect(){
  if(database != undefined){
    database.close();
    database = undefined;
    connected = false;

  }
}
module.exports = {
  connection: connection,
  findWhere : findWhere,
  disconnect: disconnect,
  addData : addData,
  removeManyData : removeManyData
}
