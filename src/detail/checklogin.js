const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/:userId', (req, res, next) => {
  const userId = req.query.userId;
  checkidsql = 'select u_num from users where id = ' + userId;
  db.query(checkidsql, (err, checkidresult) => {
    if (err) console.log(err);
    else {
      if (checkidresult != NULL) {
        console.log("존재하고, 로그인 상태")
      }
      else {
        console.log("존재하지 않거나, 비로그인 상태")
      }
    }
  });
});

module.exports = app;
