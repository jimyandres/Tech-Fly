const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./user');

const Reservation = new Schema({
  flight: { type: Schema.Types.ObjectId, ref: 'Flight' },
  status: String,
  seatsReserved: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'createdAt' } });

Reservation.pre('save', function (next) {
  User.findById(this.user, (err, userInfo) => {
    if(err) {
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
