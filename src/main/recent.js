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
  maintopsql =
    'SELECT category.c_name, board.b_name, board.b_price FROM category JOIN board on category.c_num = board.c_num AND ROWNUM < 5 AND c_name = top'; //카테고리별 4개씩 들고오기

  mainpantssql =
    'SELECT category.c_name, board.b_name, board.b_price, board.b_color, board.b_size FROM category JOIN board on category.c_num = board.c_num AND ROWNUM < 5 AND c_name = pants'; //카테고리별 4개씩 들고오기

  mainoutersql =
    'SELECT category.c_name, board.b_name, board.b_price, board.b_color, board.b_size FROM category JOIN board on category.c_num = board.c_num AND ROWNUM < 5 AND c_name = outer'; //카테고리별 4개씩 들고오기

  mainskirtsql =
    'SELECT category.c_name, board.b_name, board.b_price, board.b_color, board.b_size FROM category JOIN board on category.c_num = board.c_num AND ROWNUM < 5 AND c_name = skirt'; //카테고리별 4개씩 들고오기

  mainshoesbagssql =
    'SELECT category.c_name, board.b_name, board.b_price, board.b_color, board.b_size FROM category JOIN board on category.c_num = board.c_num AND ROWNUM < 5 AND c_name = shoesbags'; //카테고리별 4개씩 들고오기

  db.query(maintopsql, (err, result) => {
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
