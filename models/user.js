const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  reservations: [Schema.Types.Mixed],
  id: { type: Number, unique: true },
  name: String,
  birday: Date,
});

module.exports = mongoose.model('User', User);
