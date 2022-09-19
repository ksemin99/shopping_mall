const express = require('express');
const app = express();
const cors = require('cors');
const checkAuthorization = require('./checkAuthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

app.post('/', checkAuthorization.authenticateToken, (req, res) => {
  const id = req.body.id;
  // db에서 받아오기
  sql = "UPDATE users SET token = ''" + " where id ='" + id + "';";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'mysql 성공');
  });
  //refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  //res.sendStatus(204);
  res.send({ logoutid: id });
  //로그아웃과 동시에 DB에서 토큰 삭제
});

module.exports = app;
