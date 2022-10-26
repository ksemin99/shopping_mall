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

app.get('/:b_num', (req, res, next) => {
  const b_num = ParseInt(req.params.b_num);
  showcommentsql = 'SELECT * FROM comment WHERE b_num = ' + b_num;
  db.query(showcommentsql, (err, result) => {
    if (err) console.log(err);
    else {
      res.send(result);
    }
  });
});

module.exports = app;
