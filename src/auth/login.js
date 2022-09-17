const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
let refreshTokens = [];

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

dotenv.config();

app.post('/', (req, res, next) => {
  //console.log(req.body);
  const id = req.body.id;
  const pw = req.body.pw;
  const user = {
    id: id,
    pw: pw,
  };
  console.log(user);

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); //이거는 DB에 저장
  sql =
    "UPDATE users SET token ='" + refreshToken + "' where id ='" + id + "';";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'mysql 성공');
  });
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken }); //이 부분이 로그인 시 accesstoken이랑 refreshtoken 나오는 곳 // DB에 저장
});
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

module.exports = app;
