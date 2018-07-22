const mongoose = require('mongoose');

const { Schema } = mongoose;

const Airline = new Schema({
  name: String,
});

module.exports = mongoose.model('Airline', Airline);
