const mongoose = require('mongoose');

const { Schema } = mongoose;

const Airline = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'No name given'],
  },
});

module.exports = mongoose.model('Airline', Airline);
