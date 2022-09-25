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

app.get('/', (req, res, next) => {
  //new랑 best랑 카테고리별 4개씩
  categorysql = 'SELECT * FROM board ORDER BY b_time DESC limit 4';
  categorysql = 'select * from board order by b_views desc limit 4';
  categorysql = 'select * from board where c_num = 1 limit 4';
  categorysql = 'select * from board where c_num = 2 limit 4';
  categorysql = 'select * from board where c_num = 3 limit 4';
  categorysql = 'select * from board where c_num = 4 limit 4';
  categorysql = 'select * from board where c_num = 5 limit 4';
  db.query(mainsql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    res.send(result);
  });

  // res.send({
  //   picture: '',
  //   color: '',
  //   dressname: '',
  //   dressprice: '',
  //   views: '',
  //   size: '',
  // });
});

module.exports = app;
