/* eslint-disable */;
const now = new Date().setHours(0,0,0,0);
const hours = 60*60*1000;
db.aircrafts.insert([
  { "seatsNumber" : 525, "registration" : "Airbus A380-800", "__v" : 0 },
  { "seatsNumber" : 550, "registration" : "Boeing 777-300", "__v" : 0 },
  { "seatsNumber" : 524, "registration" : "Boeing 747-400", "__v" : 0 },
  { "seatsNumber" : 475, "registration" : "A340-600", "__v" : 0 },
  { "seatsNumber" : 467, "registration" : "Boeing 747-8", "__v" : 0 }
]);
db.airlines.insert([
  { "name" : "Avianca", "__v" : 0 },
  { "name" : "Copa Colombia", "__v" : 0 },
  { "name" : "Easyfly", "__v" : 0 },
  { "name" : "Lan Colombia", "__v" : 0 },
  { "name" : "Satena", "__v" : 0 },
  { "name" : "Viva Colombia", "__v" : 0 },
  { "name" : "Lan", "__v" : 0 },
  { "name" : "Taca", "__v" : 0 },
  { "name" : "Sky", "__v" : 0 }
  ]);
db.airports.insert([
  { "code" : "PEI", "name" : "Matecaña", "location" : "Pereira", "__v" : 0 },
  { "code" : "BOG", "name" : "El Dorado", "location" : "Bogota", "__v" : 0 },
  { "code" : "BAQ", "name" : "Ernesto Cortissoz", "location" : "Barranquilla", "__v" : 0 },
  { "code" : "CTG", "name" : "Rafael Núñez", "location" : "Cartagena", "__v" : 0 },
  { "code" : "MDE", "name" : "José María Córdova", "location" : "Medellín / Rionegro", "__v" : 0 },
  { "code" : "ADZ", "name" : "Gustavo Rojas Pinilla", "location" : "San Andrés", "__v" : 0 }
]);
var ac = db.aircrafts.aggregate([{$sample: {size:5}},{ $project: {"_id":1}}]);
var al = db.airlines.aggregate([{$sample: {size:9}},{ $project: {"_id":1}}]);
var ap = db.airports.aggregate([{$sample: {size:6}},{ $project: {"_id":1}}]);
db.flights.insert([
  { "airline" : al._batch[0]._id, "aircraft" : ac._batch[0]._id, "originAirport" : ap._batch[0]._id, "destinationAirport" : ap._batch[3]._id,
    "departureTime" : new Date(now + 32*hours), "arrivalTime" :new Date(now + 34.3*hours), "cost" : 273860, "__v" : 0 },
  { "airline" : al._batch[1]._id, "aircraft" : ac._batch[1]._id, "originAirport" : ap._batch[0]._id, "destinationAirport" : ap._batch[4]._id,
    "departureTime" : new Date(now + 15.4*hours), "arrivalTime" : new Date(now + 19.4*hours), "cost" : 273860, "__v" : 0 },
  { "airline" : al._batch[2]._id, "aircraft" : ac._batch[2]._id, "originAirport" : ap._batch[3]._id, "destinationAirport" : ap._batch[2]._id,
    "departureTime" : new Date(now + 46.1*hours), "arrivalTime" : new Date(now + 49.11*hours), "cost" : 347710, "__v" : 0 },
  { "airline" : al._batch[3]._id, "aircraft" : ac._batch[3]._id, "originAirport" : ap._batch[4]._id, "destinationAirport" : ap._batch[1]._id,
    "departureTime" : new Date(now + 70.65*hours), "arrivalTime" : new Date(now + 71.616*hours), "cost" : 273860, "__v" : 0 },
  { "airline" : al._batch[4]._id, "aircraft" : ac._batch[4]._id, "originAirport" : ap._batch[1]._id, "destinationAirport" : ap._batch[2]._id,
    "departureTime" : new Date(now + 68.483*hours), "arrivalTime" : new Date(now + 71.9*hours), "cost" : 231200, "__v" : 0 },
  { "airline" : al._batch[4]._id, "aircraft" : ac._batch[2]._id, "originAirport" : ap._batch[2]._id, "destinationAirport" : ap._batch[3]._id,
    "departureTime" : new Date(now + 316.33*hours), "arrivalTime" : new Date(now + 318.66*hours), "cost" : 273860, "__v" : 0 },
  { "airline" : al._batch[1]._id, "aircraft" : ac._batch[1]._id, "originAirport" : ap._batch[1]._id, "destinationAirport" : ap._batch[0]._id,
    "departureTime" : new Date(now + 346.416*hours), "arrivalTime" : new Date(now + 350.16*hours), "cost" : 273860, "__v" : 0 },
  { "airline" : al._batch[2]._id, "aircraft" : ac._batch[3]._id, "originAirport" : ap._batch[3]._id, "destinationAirport" : ap._batch[2]._id,
    "departureTime" : new Date(now + 353.31*hours), "arrivalTime" : new Date(now + 356.23*hours), "cost" : 347710, "__v" : 0 },
  { "airline" : al._batch[3]._id, "aircraft" : ac._batch[0]._id, "originAirport" : ap._batch[0]._id, "destinationAirport" : ap._batch[1]._id,
    "departureTime" : new Date(now + 358.65*hours), "arrivalTime" : new Date(now + 359.616*hours), "cost" : 273860, "__v" : 0 },
  { "airline" : al._batch[0]._id, "aircraft" : ac._batch[4]._id, "originAirport" : ap._batch[1]._id, "destinationAirport" : ap._batch[3]._id,
    "departureTime" : new Date(now + 356.48*hours), "arrivalTime" : new Date(now + 359.9*hours), "cost" : 231200, "__v" : 0 }
]);
