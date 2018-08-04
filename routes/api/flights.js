const express = require('express');
const mongoose = require('mongoose');

// Models
const Flight = require('../../models/flight');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Construct the query to find flights
const queryConstructor = (queryParams) => {
  const keys = Object.keys(queryParams);
  const query = {};
  keys.map((key) => {
    switch (key) {
      case 'originAirport':
      case 'destinationAirport': {
        return Object.assign(query, { [key]: queryParams[key] });
      }
      case 'date': {
        const newDate = new Date(queryParams[key]);
        return Object.assign(query, {
          departureTime: {
            $gte: new Date(queryParams[key]),
            $lte: new Date(newDate.setUTCHours(5 * 24)), // Get flights between 5 days
          },
        });
      }
      default: {
        return null;
      }
    }
  });
  return query;
};

// Get all flights
const getFlights = async (req, res) => {
  // Build the query object
  const query = queryConstructor(req.query);

  await Flight.find(query)
    .populate({ path: 'airline', select: 'name' })
    .populate('aircraft')
    .populate('originAirport')
    .populate('destinationAirport')
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
        return res.json({ error });
      }
      return res.json(flight);
    });
  } else {
    return res.json({ error: 'The flight is already in the database. Please check the flight info.' });
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
