const express = require('express');
const router = express.Router();
const {generateHexCode, generateMockUser, generateAccessToken} = require("../utils/mockDataGenerator")


router.get('/o/oauth2/auth', (req, res) => {
  const {redirect_uri, state} = req.query;

  const authCode = generateHexCode()
  const redirectUrl = `${redirect_uri}?code=${authCode}&authuser=0&state=${state}&prompt=none`;
  res.render('login', {title: 'Login', redirect_uri, state});
})

router.post('/oauth/login', function (req, res, next) {
  const {redirect_uri, state} = req.query;
  const email = req.body.username;

  const redirectUrl = `${redirect_uri}?code=${email}&authuser=0&state=${state}&prompt=none`;
  res.redirect(redirectUrl)
});


router.get('/oauth2/v2/userinfo', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const mockUser = generateMockUser(authHeader.slice(7))

    if (mockUser) res.json(mockUser);
    else res.status(401).json({error: 'invalid_token'});
  } else res.status(401).json({error: 'invalid_token'});
})

router.post('/token', (req, res) => {
  const {code, client_id, client_secret, redirect_uri, grant_type} = req.body;

  const accessToken = code;
  res.json(generateAccessToken(accessToken));
})


module.exports = router;
