const mongoose = require('mongoose');

const { Schema } = mongoose;

const Airline = new Schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model('Airline', Airline);
