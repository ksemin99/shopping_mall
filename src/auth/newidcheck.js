const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/:userId', (req, res, next) => {
  //res.send('연결 완');
  console.log(req);
  console.log('일단 들어옴');
  const userId = req.params.userId;
  console.log(req);
  console.log(userId + ' ddd');
  if (userId == undefined) {
    console.log('안넘어옴');
  }
  checkidsql =
    "SELECT EXISTS (select * from users where id = '" + userId + "') as isChk";
  db.query(checkidsql, (err, idresult) => {
    if (err) console.log(err);
    else {
      console.log(userId);
      if (idresult[0].isChk == 1) {
        res.send('아이디가 중복입니다. 다른아이디를 입력해주세요');
      } else {
        res.send('사용가능한 ID입니다.');
      }
    }
  });
});

module.exports = app;
