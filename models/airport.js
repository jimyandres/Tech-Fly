const mongoose = require('mongoose');

const { Schema } = mongoose;

const codeValidation = v => /[A-Z]{3}/.test(v);

const Airport = new Schema({
  code: {
    type: String,
    unique: true,
    validate: {
      validator: codeValidation,
      message: 'The code has to match IATA code',
    },
  },
  name: {
    type: String,
    required: [true, 'The Airport name is required.'],
  },
  location: {
    type: String,
    required: [true, 'Where is located the airport.'],
  },
}, {
  getters: true,
});

module.exports = mongoose.model('Airport', Airport);
