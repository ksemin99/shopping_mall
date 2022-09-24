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
  //checkauthorization.authenticateToken,
  //mainfunction.checkjwtid,
  (req, res, next) => {
    const subcategory = parseInt(req.params.subcategory);
    console.log(subcategory);
    console.log(typeof subcategory);
    let userstat = '';
    switch (subcategory) {
      case 0:
        console.log('top');
        if (userstat == '') userstat = 'top 연결 완료';
        else userstat = req.userstat;
        res.send(userstat);
        break;
      case 1:
<<<<<<< Updated upstream
        console.log('Tshirts');
        if (userstat == '') userstat = 'Tshirts 연결 완료';
=======
        console.log('mantoman hood');
        if (req.userstat == '') userstat = 'mantoman hood 연결 완료';
>>>>>>> Stashed changes
        else userstat = req.userstat;
        res.send(userstat);
        break;
      case 2:
<<<<<<< Updated upstream
        console.log('mantoman');
        if (userstat == '') userstat = 'mantoman 연결 완료';
=======
        console.log('blous shirts');
        if (req.userstat == '') userstat = 'blous shirts 연결 완료';
>>>>>>> Stashed changes
        else userstat = req.userstat;
        res.send(userstat);
        break;
      case 3:
<<<<<<< Updated upstream
        console.log('blous');
        if (userstat == '') userstat = 'blous 연결 완료';
        else userstat = req.userstat;
        res.send(userstat);
        break;
      case 4:
=======
>>>>>>> Stashed changes
        console.log('neat');
        if (userstat == '') userstat = 'neat 연결 완료';
        else userstat = req.userstat;
        res.send(userstat);
        break;
<<<<<<< Updated upstream
      case 5:
        console.log('sleeveless');
        if (userstat == '') userstat = 'sleeveless 연결 완료';
        else userstat = req.userstat;
        res.send(userstat);
        break;
=======
>>>>>>> Stashed changes
    }

  }
);

module.exports = app;
