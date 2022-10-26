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
  const b_num = parseInt(req.params.b_num);
  let sqlresult = { data1: [] };
  showcommentsql = 'SELECT * FROM comment WHERE b_num = ' + b_num;
  db.query(showcommentsql, (err, result) => {
    if (err) console.log(err);
    else {
      sqlresult.data1.push(...result);
      res.send(sqlresult);
    }
  });
});

module.exports = app;
