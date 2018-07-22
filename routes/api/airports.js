const express = require('express');
const mongoose = require('mongoose');

// Models
const Airport = require('../../models/airport');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Check if the airport exists and if not, save it
const saveAirport = async (airportInfo, res) => {
  const airportQuery = await Airport.findOne({ code: airportInfo.code });
  if (!airportQuery) {
    const newAirport = new Airport(airportInfo);
    await newAirport.save((error, airport) => {
      if (error) {
        return res.json({ error: 'There was an error saving the airport to the database. Please try again.' });
      }
      return res.json(airport);
    });
  } else {
    return res.json({ error: 'The airport code is already in the database.' });
  }
};

// POST to /
router.post('/', async (req, res) => {
  const airportInfo = req.body;
  let result;

  try {
    // Save it to the DB
    return await saveAirport(airportInfo, res);
  } catch (err) {
    result = res.json({ error: 'There was an error saving the airport to the database. Please try again.' });
  }

  return result;
});

module.exports = router;
