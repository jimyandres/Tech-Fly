const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Models
const Flight = require('../../models/flight');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Get all flights
const getFlights = async (req, res) => {
  const { from, to, date = Date() } = req.query;
  await Flight.find({
    originAirport: ObjectId(from),
    destinationAirport: ObjectId(to),
    departureTime: { $gte: new Date(date) },
  })
    .populate({ path: 'airline', select: 'name' })
    .populate({ path: 'aircraft', select: 'registration' })
    .populate({ path: 'aircraft', select: 'seatsNumber' })
    .populate('originAirport')
    .populate('destinationAirport')
    .limit(5)
    .exec((err, flights) => {
      if (err) {
        return res.json({ error: 'There was an error getting the flights. Please try again.' });
      }
      if (flights.length === 0) {
        return res.json({ error: 'There are no results. Please try again.' });
      }
      return res.json({ flights: flights.map(l => l.toObject({ virtuals: true })) });
    });
};

// Check if the flight exists and if not, save it
const saveFlight = async (flightInfo, res) => {

  const flightQuery = await Flight.findOne({
    aircraft: flightInfo.aircraft,
    departureTime: flightInfo.departureTime,
  });
  if (!flightQuery) {
    const newFlight = new Flight(flightInfo);
    await newFlight.save((error, flight) => {
      if (error) {
        return res.json({ error: 'There was an error saving the flight to the database. Please try again.' });
      }
      return res.json(flight);
    });
  } else {
    return res.json({ error: 'The flight is already in the database. Please check the aircraft info.' });
  }
};

// GET to /
router.get('/', async (req, res) => {
  let result;

  try {
    // Get all flights from the DB
    return await getFlights(req, res);
  } catch (e) {
    result = res.json({ error: 'There was an error getting the flights from the database. Please try again.' });
  }
  return result;
});


// POST to /
router.post('/', async (req, res) => {
  const flightInfo = req.body;
  let result;

  try {
    // Save it to the DB
    return await saveFlight(flightInfo, res);
  } catch (err) {
    result = res.json({ error: 'There was an error saving the flight to the database. Please try again.' });
  }

  return result;
});

module.exports = router;
