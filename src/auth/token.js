const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const checkAuthorization = require('./checkAuthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

app.post('/', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.send('리프레쉬 토큰이 만료되었습니다.');
    const accessToken = checkAuthorization.generateAccessToken({
      id: user.id,
      pw: user.pw,
    });

    const accessTokenExpiresIn =
      checkAuthorization.checkAccessTokenExpiresIn(accessToken);
    res.json({
      grantType: 'bearer',
      accessToken: accessToken,
      accessTokenExpiresIn: accessTokenExpiresIn,
    });
  });
});

module.exports = app;
