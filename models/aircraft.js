const mongoose = require('mongoose');

const { Schema } = mongoose;

const Aircraft = new Schema({
  registration: String,
  seatsNumber: Number,
});

module.exports = mongoose.model('Aircraft', Aircraft);
