const express = require('express');
const app = express();
const router = express.Router();
let refreshTokens = [];

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.post('/', (req, res) => {
  // db에서 받아오기
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  console.log(refreshTokens);
  console.log(req.body.token);
  //res.sendStatus(204);
  res.send('로그아웃 확인');
  //로그아웃과 동시에 DB에서 토큰 삭제
});

module.exports = app;
