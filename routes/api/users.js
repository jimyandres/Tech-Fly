const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Models
const User = require('../../models/user');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

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
      return res.json(user);
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

module.exports = router;
