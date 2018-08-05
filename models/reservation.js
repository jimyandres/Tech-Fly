const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./user');

const Reservation = new Schema({
  flight: {
    type: Schema.Types.ObjectId,
    ref: 'Flight',
    required: [true, 'No flight given'],
  },
  status: {
    type: String,
    required: [true, 'No status given'],
  },
  seatsReserved: {
    type: Number,
    min: 1,
    max: 8,
    required: [true, 'No seats reserved given'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'No User given'],
  },
}, { timestamps: { createdAt: 'createdAt' } });

Reservation.pre('save', function (next) {
  User.findById(this.user, (err, userInfo) => {
    if (err) {
      next(err);
    }
    userInfo.reservations.push(this._id);
    userInfo.save((e) => {
      if (e) {
        next(e);
      }
      next();
    });
  });
});

module.exports = mongoose.model('Reservation', Reservation);
