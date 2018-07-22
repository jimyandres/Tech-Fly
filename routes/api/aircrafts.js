const express = require('express');
const mongoose = require('mongoose');

// Models
const Aircraft = require('../../models/aircraft');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Save it
const saveAircraft = async (aircraftInfo, res) => {
  const newAircraft = new Aircraft(aircraftInfo);
  await newAircraft.save((error, aircraft) => {
    if (error) {
      return res.json({ error: 'There was an error saving the aircraft to the database. Please try again.' });
    }
    return res.json(aircraft);
  });
};

// POST to /
router.post('/', async (req, res) => {
  const aircraftInfo = req.body;
  let result;

  try {
    // Save it to the DB
    const aircraftSaved = await saveAircraft(aircraftInfo, res);
    return aircraftSaved;
  } catch (err) {
    result = res.json({ error: 'There was an error saving the aircraft to the database. Please try again.' });
  }

  return result;
});

module.exports = router;
