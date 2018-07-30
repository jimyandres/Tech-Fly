const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

// Models
const User = require('../../models/user');
const Reservation = require('../../models/reservation');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Get user info by his id
const getUserInfo = async (userId, res) => {
  const userQuery = await User.findOne({
    id: userId,
  });
  if (!userQuery) {
    return res.json({ error: 'The user requested does not exists. Please check the information.' });
  }
  return res.json(userQuery);
};

const getUserReservations = async (userId, res) => {
  const userQuery = await User.findOne({
    id: userId,
  })
    .populate({
      path: 'reservations',
      populate: {
        path: 'flight',
        populate: {
          path: 'airline aircraft originAirport destinationAirport',
        },
      },
    })
    .select('reservations');

  if (!userQuery) {
    return res.json({ error: 'There was an error getting the reservations from the database. Please try again.' });
  }
  return res.json(userQuery.reservations);
};

// Check the restrictions to make the reservation
const saveReservation = async (userId, reservationInfo, res) => {
  // Get the user's info
  await User.findOne({
    id: userId,
  })
    .populate('reservations')
    .exec(async (err, userInfo) => {
      if (userInfo !== null) {
        const { birthday, reservations } = userInfo;
        // Add the user id to the reservation
        Object.assign(reservationInfo, { user: userInfo._id });
        // Check the age of the user
        const age = moment().diff(birthday, 'years');
        const lastReservation = reservations.filter(r => moment().diff(r.createdAt, 'hours') < 24);
        if (age > 18) {
          // Check the last reservation made by the user
          if (lastReservation.length === 0) {
            const newReservation = new Reservation(reservationInfo);
            await newReservation.save((error, reservation) => {
              if (error) {
                return res.json({ error: 'There was an error saving the reservation to the database. Please try again.' });
              }
              return res.json({ reservation });
            });
          } else {
            return res.json({ error: "You can't make more than one reservation per day." });
          }
        } else {
          return res.json({ error: 'You must have at least 18 years to make a reservation.' });
        }
      } else {
        return res.json({ error: "The user doesn't exists. Please verify the information.", no_user: true });
      }
    });
};

// Check if the user exists and if not, save it
const saveUser = async (userInfo, res) => {
  const userQuery = await User.findOne({
    id: userInfo.id,
  });
  if (!userQuery) {
    const newUser = new User(userInfo);
    await newUser.save((error, user) => {
      if (error) {
        return res.json({ error: 'There was an error saving the User to the database. Please try again.' });
      }
      return res.json({ user });
    });
  } else {
    return res.json({ error: 'The user is already in the database. Please check the information.' });
  }
};

// Post to /
router.post('/', async (req, res) => {
  const userInfo = req.body;
  let result;

  try {
    // Save it to the DB
    return await saveUser(userInfo, res);
  } catch (e) {
    result = res.json({ error: 'There was an error saving the user info. Please try again.' });
  }

  return result;
});

// GET to /:id
router.get('/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  let result;

  try {
    // Get user info
    return await getUserInfo(userId, res);
  } catch (e) {
    result = res.json({ error: "There was an error getting the user's info. Please try again." });
  }

  return result;
});

// POST to /:user_id/reservations
router.post('/:user_id/reservations', async (req, res) => {
  const reservationInfo = req.body;
  const userId = req.params.user_id;
  let result;

  try {
    // Save the reservation to the DB
    return await saveReservation(userId, reservationInfo, res);
  } catch (e) {
    result = res.json({ error: 'There was an error making the reservation. Please try again.' });
  }

  return result;
});

// GET to/:user_id/reservations
router.get('/:user_id/reservations', async (req, res) => {
  const userId = req.params.user_id;
  let result;

  try {
    // Get the reservations
    return await getUserReservations(userId, res);
  } catch (e) {
    result = res.json({ error: 'There was an error getting the reservations. Please try again.' });
  }

  return result;
});

module.exports = router;
