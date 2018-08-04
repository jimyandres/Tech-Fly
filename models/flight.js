const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

// Check if the string is a "valid" ObjectId (12 bytes)
const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

// Check if the date is greater than today's time
const isValidDate = date => moment(date) > moment();

const Flight = new Schema({
  airline: {
    type: Schema.Types.ObjectId,
    ref: 'Airline',
    required: [true, 'No airline given'],
    validate: {
      validator: isValidObjectId,
      message: 'The airline has not a valid id.',
    },
  },
  aircraft: {
    type: Schema.Types.ObjectId,
    ref: 'Aircraft',
    required: [true, 'No aircraft given'],
    validate: {
      validator: isValidObjectId,
      message: 'The aircraft has not a valid id.',
    },
  },
  originAirport: {
    type: Schema.Types.ObjectId,
    ref: 'Airport',
    required: [true, 'No origin airport given'],
    validate: {
      validator: isValidObjectId,
      message: 'The origin airport has not a valid id.',
    },
  },
  destinationAirport: {
    type: Schema.Types.ObjectId,
    ref: 'Airport',
    required: [true, 'No destination airport given'],
    validate: {
      validator: isValidObjectId,
      message: 'The destination airport has not a valid id.',
    },
  },
  departureTime: {
    type: Date,
    validate: {
      validator: isValidDate,
      message: 'Departure time has not a valid date',
    },
  },
  arrivalTime: {
    type: Date,
    validate: {
      validator() {
        // Check if the arrival time is greater then departure time
        return moment(this.departureTime) < moment(this.arrivalTime);
      },
      message: 'Arrival time has not a valid date',
    },
    required: [true,
      'Arrival time cannot be lower than the departure time'],
  },
  cost: {
    type: Number,
    min: 20000,
  },
});

module.exports = mongoose.model('Flight', Flight);
