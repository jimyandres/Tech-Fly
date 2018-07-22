const mongoose = require('mongoose');

const { Schema } = mongoose;

const Reservation = new Schema({
  number: { type: String, unique: true },
  flight: Schema.Types.Mixed,
  status: String,
  date: Date,
  seatsReserved: Number,
});

module.exports = mongoose.model('Reservation', Reservation);
