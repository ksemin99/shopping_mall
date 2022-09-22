const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const checkauthorization = require('../../auth/checkauthorization');
const mainfunction = require('../mainfunction');

const mysqlConObj = require('../../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();
app.get(
  '/',
  checkauthorization.authenticateToken,
  mainfunction.checkjwtid,
  (req, res, next) => {
    let userstat = '';
    if (req.userstat == '') userstat = 'best 연결 완료';
    else userstat = req.userstat;

    console.log(userstat);

    res.send(userstat);
  }
);
module.exports = app;
