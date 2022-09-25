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
  let recentresult = [];
  newsql =
    'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num order by b.b_time desc limit 12';
  bestsql =
    'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num order by b.b_views desc limit 12';
  topsql =
    'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 1 limit 12';
  pantssql =
    'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 2 limit 12';
  outersql =
    'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 3 limit 12';
  skirtsql =
    'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 4 limit 12';
  shoesbagssql =
    'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 5 limit 12';
  db.query(newsql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    recentresult.push(result);
    res.send(result);
  });
  db.query(bestsql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    res.send(result);
  });
  db.query(topsql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    res.send(result);
  });
  db.query(pantssql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    res.send(result);
  });
  db.query(outersql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    res.send(result);
  });
  db.query(skirtsql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    res.send(result);
  });
  db.query(shoesbagssql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
    res.send(result);
  });
});

module.exports = app;
