const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id + ' ddd');
  checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, idresult) => {
    if (err) console.log(err);
    else {
      console.log(id);
      if (idresult[0].isChk == 1) {
        res.send('아이디가 데베에 존재함');
      } else {
        res.send('사용가능한 ID입니다.');
      }
    }
  });
});

module.exports = app;
