//routers.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users API');
});

module.exports = router;