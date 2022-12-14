const express = require('express');
const app = express();
const cors = require('cors');
const checkauthorization = require('./checkauthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

app.post('/', checkauthorization.authenticateToken, (req, res) => {
  const id = req.body.id;
  // db에서 받아오기
  sql = "UPDATE users SET token = NULL where id ='" + id + "';";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else res.send({ logoutid: id });
  });
  //refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  //res.sendStatus(204);

  //로그아웃과 동시에 DB에서 토큰 삭제
});

module.exports = app;
