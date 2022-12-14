const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const checkauthorization = require('./checkauthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

app.post('/', function (req, res) {
  token = req.body.refreshToken;
  console.log(req);
  console.log('refreshToken = ' + token);
  sql = 'select token from users where token = "' + token + '"';
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      let refreshToken = '';
      for (let data of result) {
        refreshToken = data.token;
      }
      if (refreshToken == null)
        return res.send('로그인을 하지 않은 상태입니다.');
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err)
            return res.send('리프레쉬 토큰이 만료되었습니다. 다시 로그인');
          // console.log(err);
          const accessToken = checkauthorization.generateAccessToken({
            // refreshToken이 살아있을 때
            id: user.id,
            pw: user.pw,
          });
          console.log(accessToken);
          const accessTokenExpiresIn =
            checkauthorization.checkAccessTokenExpiresIn(accessToken); // accessToken 생명주기 불러오기
          console.log(accessTokenExpiresIn);
          res.send({
            // accessToken 발급
            grantType: 'bearer',
            accessToken: accessToken,
            accessTokenExpiresIn: accessTokenExpiresIn,
          });
        }
      );
    }
  });
});

module.exports = app;
