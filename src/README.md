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
    new_position=[-5.456863,45.64863]&
    time=1458121060424
######Ajout utilisateur dans la base
    POST : http://localhost:8080/api/add-user?
    user={"test":true,"dev_id":"020000FFFF00A122","team":{"type":"homme","name":"Team de test"}}
######Suppression utilisateur dans la base en fonction de l'id dans la base
    DELETE : http://localhost:8080/api/delete-user?
    id=56b74dfcfeef38881809d765
#####Récupération de toutes les informations de la base trace
    GET : http://localhost:8080/api/get-all-user
#####Début de la course
    GET : http://localhost:8080//api/start
#####Récupération d'un tableau de JSON personnalisé pour les teams
    GET : http://localhost:8080/api/teams
#####Récupération de tout les circuits en fonction du paramètre confirme (true ou false)
    GET : http://localhost:8080/api/circuits/:confirme
#####Récupération de tout les circuits en fonction du paramètre confirme (true ou false)
    GET : http://localhost:8080/api/:circuits/:confirme
#####Récupération du circuit demandé en fonction du paramètre confirme (true ou false) et du circuit renseigné ("kayak", "running" ou "velo")
    GET : http://localhost:8080/api/circuit/:circuit/:confirme
