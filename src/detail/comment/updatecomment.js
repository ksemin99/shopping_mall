const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const checkauthorization = require('../../auth/checkauthorization');

const mysqlConObj = require('../../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.patch('/', checkauthorization.authenticateToken, (req, res, next) => {
  const index = req.body.index;
  const b_num = Number(req.body.b_num);
  const u_num = Number(req.body.u_num);
  const id = req.body.id;
  const newcomment = req.query.newcomment;
  updatesql =
    'UPDATE comment SET comment = ' +
    newcomment +
    ' WHERE b_num = ' +
    b_num +
    ' AND u_num = ' +
    u_num +
    ' AND index = ' +
    index;
  db.query(updatesql, (err, updateresult) => {
    if (err) console.log(err);
    else {
      console.log('업데이트성공');
    }
  });
});

module.exports = app;
