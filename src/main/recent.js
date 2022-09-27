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
  let sqlresult = { data1: [], data2: [] };

  // best랑 카테고리별 4개씩
  bestsql =
    'SELECT DISTINCT b.b_name, b.b_url, b.b_price, b.b_views FROM board b, board_color bc WHERE b.b_num = bc.bc_num ORDER BY b.b_views desc limit 4';
  topsql =
    'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 1 ORDER BY b.b_views desc limit 4';
  pantssql =
    'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 2 ORDER BY b.b_views desc limit 4';
  outersql =
    'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 3 ORDER BY b.b_views desc limit 4';
  skirtsql =
    'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 4 ORDER BY b.b_views desc limit 4';
  shoesbagssql =
    'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 5 ORDER BY b.b_views desc limit 4';

  db.query(bestsql, (err, result) => {
    if (err) console.log(err);
    else sqlresult.data1.push(...result);
  });

  db.query(topsql, (err, result) => {
    if (err) console.log(err);
    else sqlresult.data2.push(...result);
  });
  db.query(pantssql, (err, result) => {
    if (err) console.log(err);
    else sqlresult.data2.push(...result);
  });
  db.query(outersql, (err, result) => {
    if (err) console.log(err);
    else sqlresult.data2.push(...result);
  });
  db.query(skirtsql, (err, result) => {
    if (err) console.log(err);
    else sqlresult.data2.push(...result);
  });
  db.query(shoesbagssql, (err, result) => {
    if (err) console.log(err);
    else sqlresult.data2.push(...result);
    //res.send(sqlresult);
  });

  for (let k = 0; k < 4; k++) {
    let semi = [];
    let test = [];
    bestcolorsql =
      'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND b.c_num = 1 AND bc.bc_num = (SELECT b_num FROM board ORDER BY b_views desc limit ' +
      k +
      ', 1)';
    db.query(bestcolorsql, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        sqlresult.data1[k].b_color = test.concat(...semi);
      }
      // if (k == 3) res.send(sqlresult);
    });
  }

  for (let k = 0; k < 4; k++) {
    let semi = [];
    let test = [];
    topcolorsql =
      'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 1 ORDER BY b_views desc limit ' +
      k +
      ', 1)';
    db.query(topcolorsql, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        sqlresult.data2[k].b_color = test.concat(...semi);
      }
      // if (k == 3) res.send(sqlresult);
    });
  }
  for (let k = 0; k < 4; k++) {
    let semi = [];
    let test = [];
    pantscolorsql =
      'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 2 ORDER BY b_views desc limit ' +
      k +
      ', 1)';
    db.query(topcolorsql, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        sqlresult.data2[k + 4].b_color = test.concat(...semi);
      }
      // if (k == 3) res.send(sqlresult);
    });
  }
  for (let k = 0; k < 4; k++) {
    let semi = [];
    let test = [];
    outercolorsql =
      'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 3 ORDER BY b_views desc limit ' +
      k +
      ', 1)';
    db.query(topcolorsql, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        sqlresult.data2[k + 8].b_color = test.concat(...semi);
      }
      // if (k == 3) res.send(sqlresult);
    });
  }
  for (let k = 0; k < 4; k++) {
    let semi = [];
    let test = [];
    skirtcolorsql =
      'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 4 ORDER BY b_views desc limit ' +
      k +
      ', 1)';
    db.query(topcolorsql, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        sqlresult.data2[k + 12].b_color = test.concat(...semi);
      }
      // if (k == 3) res.send(sqlresult);
    });
  }
  for (let k = 0; k < 4; k++) {
    let semi = [];
    let test = [];
    shoesbagscolorsql =
      'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 5 ORDER BY b_views desc limit ' +
      k +
      ', 1)';
    db.query(topcolorsql, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        sqlresult.data2[k + 16].b_color = test.concat(...semi);
      }
      if (k == 3) res.send(sqlresult);
    });
  }
});

module.exports = app;
