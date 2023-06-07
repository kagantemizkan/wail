//users.js
const express = require('express');
const router = express.Router();

const connection = require('./config');
const { checkLogin } = require('./db');

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    const user = checkLogin(email, password);

    if (!user) {
      res.status(400).json({ error: 'Please check your login credentials' });
      return;
    }

    // Actions to perform on successful login
    // ...

    res.json({ success: true });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

router.post('/register', (req, res) => {
  try {
    const { email, username, password } = req.body;

    const newUser = {
      email: email,
      username: username,
      password: password,
    };

    const query = 'INSERT INTO users SET ?';
    connection.query(query, newUser, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
      res.json({ success: true });
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;