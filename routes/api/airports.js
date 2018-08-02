const express = require('express');
const mongoose = require('mongoose');

// Models
const Airport = require('../../models/airport');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// get from the DB all airports location
const getAirportsLocation = async (res) => {
  const locations = await Airport.find({}).select('name location _id');
  return res.json({ locations: locations.map(l => l.toObject({ virtuals: true })) });
};

// Check if the airport exists and if not, save it
const saveAirport = async (airportInfo, res) => {
  const airportQuery = await Airport.findOne({ code: airportInfo.code });
  if (!airportQuery) {
    const newAirport = new Airport(airportInfo);
    await newAirport.save((error, airport) => {
      if (error) {
        return res.json({ error });
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
    result = await saveAirport(airportInfo, res);
  } catch (err) {
    result = res.json({ error: 'There was an error saving the airport to the database. Please try again.' });
  }

  return result;
});

// GET to /locations
router.get('/locations', async (req, res) => {
  let result;

  try {
    // Get all locations
    return await getAirportsLocation(res);
  } catch (e) {
    result = res.json({ error: 'There was an error getting the airports location from the database. Please try again.' });
  }
  return result;
});

module.exports = router;
