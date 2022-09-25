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
  mainsql =
    'SELECT category.c_name, board.b_name, board.b_price, board.b_color, board.b_size FROM category join board on category.c_num = board.c_num AND ROWNUM < 5'; //카테고리별 4개씩 들고오기

  db.query(mainsql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
  });

  res.send(result);

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
