const mongoose = require('mongoose');

const { Schema } = mongoose;

const Airport = new Schema({
  code: { type: String, unique: true },
  name: String,
  location: String,
}, {
  getters: true,
});

module.exports = mongoose.model('Airport', Airport);
