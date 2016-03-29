import pymongo
from pymongo import MongoClient

client = MongoClient('valentin-boucher.fr', 27017)
db = client.raid
collection = db.trace
collection.update({'properties.team.name' : 'Branlo Team'}, { '$set' : {'properties.team.name' : 'Team de test 2'}})
