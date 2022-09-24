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

app.get('/:categoryid/:page', (req, res, next) => {
  // DB로 categoryid 별 애들 불러오기
  const categoryid = req.params.categoryid; // 0: top, 1: pants, 2:outer, 3: skirt, 4: shoes&bags
  const page = req.params.page;
  categorysql = '';

  db.query(categorysql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
  });

  res.send();
});

module.exports = app;
