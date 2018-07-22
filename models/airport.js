const mongoose = require('mongoose');

const { Schema } = mongoose;

const Airport = new Schema({
  code: { type: String, unique: true },
  name: String,
  location: String,
});

module.exports = mongoose.model('Airport', Airport);
