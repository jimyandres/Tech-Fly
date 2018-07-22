const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ Text: 'Tech&Fly' });
});

module.exports = router;
