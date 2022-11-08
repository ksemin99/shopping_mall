const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const checkauthorization = require('./checkauthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();
const cookieParser = require('cookie-parser')

app.use(cookieParser('secretKey'))

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

  const accessToken = checkauthorization.generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  }); //이거는 DB에 저장

  const accessTokenExpiresIn =
    checkauthorization.checkAccessTokenExpiresIn(accessToken);
  const refreshTokenExpiresIn =
    checkauthorization.checkRefreshTokenExpiresIn(refreshToken);

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
        u_numsql = "select u_num from users where id = '" + id + "';";
        db.query(u_numsql, (err, result) => {
          if (err) console.log(err);
          else {
            const idIndex = result[0].u_num;
            console.log(idIndex);
            console.log('u_num : ' + result[0].u_num);
            sql =
              "UPDATE users SET token ='" +
              refreshToken +
              "' where id ='" +
              id +
              "';"; // refreshtoken DB에 저장
            db.query(sql, (err, result) => {
              if (err) console.log(err);
              else {
                console.log(result, 'mysql 안에 refresh 토큰 삽입 성공');
                res.json({
                  id: id,
                  idIndex: idIndex,
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                  accessTokenexpiresIn: accessTokenExpiresIn,
                  refreshTokenexpiresIn: refreshTokenExpiresIn,
                }); //이 부분이 로그인 시 accesstoken이랑 refreshtoken 나오는 곳
                basketupdatesql = "UPDATE basket SET id = '" +
                  req.query.id +
                  "' WHERE cookie = " +
                  req.signedCookies.key + // value값으로 수정
                  " AND id = ''"
                db.query(basketupdatesql, (err, basketupdateresult) => {
                  if (err) console.log(err);
                });
              }
            });
          }
        });
      }
    }
  });
  // --
});

module.exports = app;
