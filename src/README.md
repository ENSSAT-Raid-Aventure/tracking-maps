# replay-example
Exemple de replay d'un parcours avec fichiers Geojson et Leaflet

### npm install
* http
* url
* querystring
* express
* body-parser
* socket.io
* underscore
* fs
* assert
* mongodb
* q
* d3
* jsdom
##DOCS

###API
######Mise à jour de la base pour un utilisateur donné (device_id)
    PUT : http://localhost:8080/api/update?
    device_id=020000FFFF00A120&
    new_position={lat:-5.456863,lng:45.64863}&
    time=1458121060424
######Ajout utilisateur dans la base
    POST : http://localhost:8080/api/add-user?
    user={"test":true,"dev_id":"020000FFFF00A122","team":{"type":"homme","name":"Team de test"}}
######Suppression utilisateur dans la base en fonction de l'id dans la base
    DELETE : http://localhost:8080/api/get-all-user?
    id=56b74dfcfeef38881809d765
#####Récupération de toutes les informations de la base
    GET : http://localhost:8080/api/get-all-user
