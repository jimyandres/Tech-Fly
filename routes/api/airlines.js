const express = require('express');
const mongoose = require('mongoose');

// Models
const Airline = require('../../models/airline');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Check if the airline exists and if not, save it
const saveAirline = async (airlineInfo, res) => {
  const airlineQuery = await Airline.findOne({ name: airlineInfo.name });
  if (!airlineQuery) {
    const newAirline = new Airline(airlineInfo);
    await newAirline.save((error, airline) => {
      if (error) {
        return res.json({ error: 'There was an error saving the airline to the database. Please try again.' });
      }
      return res.json(airline);
    });
  } else {
    return res.json({ error: 'The airline is already in the database.' });
  }
};

// POST to /
router.post('/', async (req, res) => {
  const airlineInfo = req.body;
  let result;

  try {
    // Save it to the DB if it's not already there
    return await saveAirline(airlineInfo, res);
  } catch (err) {
    result = res.json({ error: 'There was an error saving the airline to the database. Please try again.' });
  }

  return result;
});

module.exports = router;
