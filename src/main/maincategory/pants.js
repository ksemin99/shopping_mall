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
  '/:subcategory',
  checkauthorization.authenticateToken,
  mainfunction.checkjwtid,
  (req, res, next) => {
    const subcategory = parseInt(req.params.subcategory);
    console.log(subcategory);
    console.log(typeof subcategory);
    let userstat = '';
    switch (subcategory) {
      case 0:
        console.log('pants');
        if (req.userstat == '') userstat = 'pants 연결 완료';
        else userstat = req.userstat;
        break;
      case 1:
        console.log('semiwide');
        if (req.userstat == '') userstat = 'semiwide 연결 완료';
        else userstat = req.userstat;
        break;
      case 2:
        console.log('wide');
        if (req.userstat == '') userstat = 'wide 연결 완료';
        else userstat = req.userstat;
        break;
      case 3:
        console.log('straight');
        if (req.userstat == '') userstat = 'straight 연결 완료';
        else userstat = req.userstat;
        break;
      case 4:
        console.log('training');
        if (req.userstat == '') userstat = 'training 연결 완료';
        else userstat = req.userstat;
        break;
      case 5:
        console.log('bootscut');
        if (req.userstat == '') userstat = 'bootscut 연결 완료';
        else userstat = req.userstat;
        break;
    }
    res.send(userstat);
  }
);
module.exports = app;
