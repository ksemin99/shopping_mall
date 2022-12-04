const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();
const cookieParser = require('cookie-parser');

app.use(cookieParser('secretKey'));

app.use(cors());

dotenv.config();

app.patch('/', (req, res, next) => {
  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 우편번호, 집주소, 상세주소, 이메일, 휴대폰, 계좌
  const name = req.body.name;
  const id = req.body.id;
  const sex = req.body.sex;
  const height = req.body.height;
  const weight = req.body.weight;

  updatesql =
    'UPDATE users SET name = ' +
    name +
    ', sex = ' +
    sex +
    ', height = ' +
    height +
    ', weigth = ' +
    weight +
    ' WHERE id = ' +
    id;
  db.query(updatesql, (err, updateresult) => {
    if (err) console.log(err);
    else {
      res.send(updatesql);
    }
  });
});

module.exports = app;
