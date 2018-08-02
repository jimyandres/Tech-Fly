const mongoose = require('mongoose');

const { Schema } = mongoose;

const Aircraft = new Schema({
  registration: {
    type: String,
    required: ['Registration number is required'],
  },
  seatsNumber: {
    type: Number,
    min: [2, 'Too few seats number'],
    max: [600, 'Too much seats number'],
  },
});

module.exports = mongoose.model('Aircraft', Aircraft);
