const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
let refreshTokens = [];

app.post('/', (req, res) => {
  const refreshToken = req.body.token; // db에서 refresh토큰 찾아서 여따가 넣어줘야함
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ id: user.id, pw: user.pw });
    res.json({ accessToken: accessToken });
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

module.exports = app;
