const mongoose = require('mongoose');

const { Schema } = mongoose;

const Flight = new Schema({
  number: { type: String, unique: true },
  airline: Schema.Types.Mixed,
  aircraft: Schema.Types.Mixed,
  originAirport: Schema.Types.Mixed,
  destinationAirport: Schema.Types.Mixed,
  departureTime: String,
  arrivalTime: String,
  cost: Number,
});

module.exports = mongoose.model('Flight', Flight);
