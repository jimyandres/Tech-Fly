const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
  id: { type: Number, unique: true },
  name: String,
  birthday: Date,
});

module.exports = mongoose.model('User', User);
