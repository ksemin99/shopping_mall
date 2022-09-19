const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const checkAuthorization = require('./checkAuthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

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

  const accessToken = checkAuthorization.generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  }); //이거는 DB에 저장

  //id 체크부분 --
  checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result[0].isChk);
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        sql =
          "UPDATE users SET token ='" +
          refreshToken +
          "' where id ='" +
          id +
          "';"; // refreshtoken DB에 저장
        db.query(sql, (err, result) => {
          if (err) console.log(err);
          else console.log(result, 'mysql 안에 access 토큰 삽입 성공');
        });
      }
    }
  });
  //--

  res.json({ accessToken: accessToken, refreshToken: refreshToken }); //이 부분이 로그인 시 accesstoken이랑 refreshtoken 나오는 곳
});

module.exports = app;
