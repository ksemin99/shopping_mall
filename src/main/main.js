const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const checkauthorization = require('../auth/checkauthorization');
const mainfunction = require('./mainfunction');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

// app.get(
//   '/',
//   //checkauthorization.authenticateToken,
//   //mainfunction.checkjwtid,
//   (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     // let userstat = '';
//     // if (req.userstat == '') userstat = 'main 연결 완료';
//     // else userstat = req.userstat;

//     // console.log(userstat);

//     // res.send(userstat);
//     res.send('메인 화면입니다.')
//   }
// );
app.get('/', (req, res, next) => {
  res.send('메인 화면입니다.');
})

module.exports = app;
