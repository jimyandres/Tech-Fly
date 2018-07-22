const mongoose = require('mongoose');

const { Schema } = mongoose;

const Flight = new Schema({
  airline: { type: Schema.Types.ObjectId, ref: 'Airline' },
  aircraft: { type: Schema.Types.ObjectId, ref: 'Aircraft' },
  originAirport: { type: Schema.Types.ObjectId, ref: 'Airport' },
  destinationAirport: { type: Schema.Types.ObjectId, ref: 'Airport' },
  departureTime: Date,
  arrivalTime: Date,
  cost: Number,
});

module.exports = mongoose.model('Flight', Flight);
