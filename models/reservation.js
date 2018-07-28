const mongoose = require('mongoose');

const { Schema } = mongoose;

const Reservation = new Schema({
  flight: { type: Schema.Types.ObjectId, ref: 'Flight' },
  status: String,
  date: Date,
  seatsReserved: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Reservation', Reservation);
