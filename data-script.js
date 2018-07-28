/* eslint-disable */;
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
var aircrafts = db.aircrafts.aggregate([{$sample: {size:5}},{ $project: {"_id":1}}]);
var airlines = db.airlines.aggregate([{$sample: {size:9}},{ $project: {"_id":1}}]);
var airports = db.airports.aggregate([{$sample: {size:6}},{ $project: {"_id":1}}]);
db.flights.insert([
  { "airline" : airlines._batch[0]._id, "aircraft" : aircrafts._batch[0]._id, "originAirport" : airports._batch[0]._id, "destinationAirport" : airports._batch[3]._id, "departureTime" : ISODate("2018-08-09T09:20:00Z"), "arrivalTime" : ISODate("2018-08-09T11:40:00Z"), "cost" : 273860, "__v" : 0 },
  { "airline" : airlines._batch[1]._id, "aircraft" : aircrafts._batch[1]._id, "originAirport" : airports._batch[0]._id, "destinationAirport" : airports._batch[4]._id, "departureTime" : ISODate("2018-07-27T15:25:00Z"), "arrivalTime" : ISODate("2018-07-27T19:10:00Z"), "cost" : 273860, "__v" : 0 },
  { "airline" : airlines._batch[2]._id, "aircraft" : aircrafts._batch[2]._id, "originAirport" : airports._batch[3]._id, "destinationAirport" : airports._batch[2]._id, "departureTime" : ISODate("2018-07-28T22:19:00Z"), "arrivalTime" : ISODate("2018-07-29T01:14:00Z"), "cost" : 347710, "__v" : 0 },
  { "airline" : airlines._batch[3]._id, "aircraft" : aircrafts._batch[3]._id, "originAirport" : airports._batch[4]._id, "destinationAirport" : airports._batch[1]._id, "departureTime" : ISODate("2018-07-30T03:39:00Z"), "arrivalTime" : ISODate("2018-07-30T04:37:00Z"), "cost" : 273860, "__v" : 0 },
  { "airline" : airlines._batch[4]._id, "aircraft" : aircrafts._batch[4]._id, "originAirport" : airports._batch[1]._id, "destinationAirport" : airports._batch[2]._id, "departureTime" : ISODate("2018-07-30T01:29:00Z"), "arrivalTime" : ISODate("2018-07-30T04:54:00Z"), "cost" : 231200, "__v" : 0 },
  { "airline" : airlines._batch[4]._id, "aircraft" : aircrafts._batch[2]._id, "originAirport" : airports._batch[2]._id, "destinationAirport" : airports._batch[3]._id, "departureTime" : ISODate("2018-08-09T09:20:00Z"), "arrivalTime" : ISODate("2018-08-09T11:40:00Z"), "cost" : 273860, "__v" : 0 },
  { "airline" : airlines._batch[1]._id, "aircraft" : aircrafts._batch[1]._id, "originAirport" : airports._batch[1]._id, "destinationAirport" : airports._batch[0]._id, "departureTime" : ISODate("2018-08-10T15:25:00Z"), "arrivalTime" : ISODate("2018-08-10T19:10:00Z"), "cost" : 273860, "__v" : 0 },
  { "airline" : airlines._batch[2]._id, "aircraft" : aircrafts._batch[3]._id, "originAirport" : airports._batch[3]._id, "destinationAirport" : airports._batch[2]._id, "departureTime" : ISODate("2018-08-10T22:19:00Z"), "arrivalTime" : ISODate("2018-08-11T01:14:00Z"), "cost" : 347710, "__v" : 0 },
  { "airline" : airlines._batch[3]._id, "aircraft" : aircrafts._batch[0]._id, "originAirport" : airports._batch[0]._id, "destinationAirport" : airports._batch[1]._id, "departureTime" : ISODate("2018-08-11T03:39:00Z"), "arrivalTime" : ISODate("2018-08-11T04:37:00Z"), "cost" : 273860, "__v" : 0 },
  { "airline" : airlines._batch[0]._id, "aircraft" : aircrafts._batch[4]._id, "originAirport" : airports._batch[1]._id, "destinationAirport" : airports._batch[3]._id, "departureTime" : ISODate("2018-08-11T01:29:00Z"), "arrivalTime" : ISODate("2018-08-11T04:54:00Z"), "cost" : 231200, "__v" : 0 }
]);
