const express = require('express');
const mongoose = require('mongoose');

// Models
const Flight = require('../../models/flight');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Check if the flight exists and if not, save it
const saveFlight = async (flightInfo, res) => {
  const flightQuery = await Flight.findOne({
    aircraft: flightInfo.aircraft,
    departureTime: flightInfo.aircraft,
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
