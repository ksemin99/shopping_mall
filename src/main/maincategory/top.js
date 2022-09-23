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
    const subcategory = req.params.subcategory;
    let userstat = '';
    switch (subcategory) {
      case 0:
        if (req.userstat == '') userstat = 'top 연결 완료';
        else userstat = req.userstat;
        console.log(userstat);
      case 1:
        console.log('Tshirts');
        if (req.userstat == '') userstat = 'Tshirts 연결 완료';
        else userstat = req.userstat;
      case 2:
        console.log('mantoman');
        if (req.userstat == '') userstat = 'mantoman 연결 완료';
        else userstat = req.userstat;
      case 3:
        console.log('blous');
        if (req.userstat == '') userstat = 'blous 연결 완료';
        else userstat = req.userstat;
      case 4:
        console.log('neat');
        if (req.userstat == '') userstat = 'neat 연결 완료';
        else userstat = req.userstat;
      case 5:
        console.log('sleeveless');
        if (req.userstat == '') userstat = 'sleeveless 연결 완료';
        else userstat = req.userstat;
    }
    res.send(userstat);
  }
);

module.exports = app;
