//auth.js
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const client_id = ''; // Your client id
const client_secret = ''; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
const bearerPort = 8889;

const generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const router = express.Router();

router.use(cookieParser());

// Configure passport to use BearerStrategy
passport.use(
  new BearerStrategy(function (token, done) {
    // Implement your own logic to validate and retrieve user information
    // For example, you can query your database to validate the token and retrieve user information

    // Assuming you have a function named `getUserByToken` that retrieves user information from the token
    getUserByToken(token, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

router.get('/login', function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scope = 'user-read-private user-read-email user-read-currently-playing';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        request.get(options, function (error, response, body) {
          console.log(body);
        });

        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

// Add Bearer authentication middleware for /spotify endpoint
router.get('/spotify', passport.authenticate('bearer', { session: false }), function (req, res) {
  res.json({ message: 'Authenticated via Bearer token for Spotify' });
});

// Add Bearer authentication middleware for /email endpoint
router.get('/email', passport.authenticate('bearer', { session: false }), function (req, res) {
  res.json({ message: 'Authenticated via Bearer token for Email' });
});

module.exports = router;