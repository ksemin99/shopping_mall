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

app.get('/:categoryid', (req, res, next) => {
  // DB로 categoryid 별 애들 불러오기
  const categoryid = req.params.categoryid;
  //const page = req.params.page;
  switch (categoryid) {
    case 0: //top
      categorysql = '';
      break;
    case 1: //pants
      categorysql = '';
      break;
    case 2: //outer
      categorysql = '';
      break;
    case 3: //skirt
      categorysql = '';
      break;
    case 4: //shoes&bags
      categorysql = '';
      break;
  }

  db.query(categorysql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
  });

  res.send({
    picture: '',
    color: '',
    dressname: '',
    dressprice: '',
    views: '',
  });
});

module.exports = app;
