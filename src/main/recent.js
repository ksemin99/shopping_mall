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
  // //new랑 best랑 카테고리별 4개씩
  // let recentresult = { data1: [], data2: [] };
  // // newsql =
  // //   'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num order by b.b_time desc limit 12';
  // bestsql =
  //   'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num order by b.b_views desc limit 12';
  // topsql =
  //   'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 1 limit 12';
  // pantssql =
  //   'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 2 limit 12';
  // outersql =
  //   'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 3 limit 12';
  // skirtsql =
  //   'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 4 limit 12';
  // shoesbagssql =
  //   'select b.b_name, b.b_url, b.b_price, bd.b_color, b.b_views from board b, board_detail bd where b.b_num = bd.b_num and b.c_num = 5 limit 12';

  // db.query(bestsql, (err, result) => {
  //   if (err) console.log(err);
  //   else console.log(result, 'sql 성공');

  //   recentresult.data1.push(...result);
  //   recentresult.data1[0].id = 1;
  //   recentresult.data1[1].id = 1;
  //   recentresult.data1[2].id = 1;
  //   recentresult.data1[3].id = 2;
  //   recentresult.data1[4].id = 2;
  //   recentresult.data1[5].id = 2;
  //   recentresult.data1[6].id = 3;
  //   recentresult.data1[7].id = 3;
  //   recentresult.data1[8].id = 3;
  //   recentresult.data1[9].id = 4;
  //   recentresult.data1[10].id = 4;
  //   recentresult.data1[11].id = 4;
  //   //res.send(result);
  // });

  // db.query(topsql, (err, result) => {
  //   if (err) console.log(err);
  //   else console.log(result, 'sql 성공');
  //   recentresult.data2.push(result);
  //   //res.send(data1);
  // });
  // db.query(pantssql, (err, result) => {
  //   if (err) console.log(err);
  //   else console.log(result, 'sql 성공');
  //   recentresult.data2.push(result);
  //   //res.send(result);
  // });
  // db.query(outersql, (err, result) => {
  //   if (err) console.log(err);
  //   else console.log(result, 'sql 성공');
  //   recentresult.data2.push(result);
  //   //res.send(result);
  // });
  // db.query(skirtsql, (err, result) => {
  //   if (err) console.log(err);
  //   else console.log(result, 'sql 성공');
  //   recentresult.data2.push(result);
  //   //res.send(result);
  // });
  // db.query(shoesbagssql, (err, result) => {
  //   if (err) console.log(err);
  //   else console.log(result, 'sql 성공');
  //   recentresult.data2.push(result);
  //   res.send(recentresult);
  // });
  res.send({
    data1: [
      {
        b_name: '신발4',
        b_url: 'ㅇㅇ',
        b_price: '50000',
        b_color: [
          { b_color: '#fff' },
          { b_color: '#676767' },
          { b_color: '#000' },
        ],
        b_views: 29,
      },
      {
        b_name: '신발2',
        b_url: 'ㅇㅇ',
        b_price: '50000',
        b_color: [
          { b_color: '#fff' },
          { b_color: '#676767' },
          { b_color: '#000' },
        ],
        b_views: 23,
      },
      {
        b_name: '신발3',
        b_url: 'ㅇㅇ',
        b_price: '50000',
        b_color: [
          { b_color: '#fff' },
          { b_color: '#676767' },
          { b_color: '#000' },
        ],
        b_views: 21,
      },
      {
        b_name: '신발1',
        b_url: 'ㅇㅇ',
        b_price: '50000',
        b_color: [
          { b_color: '#fff' },
          { b_color: '#676767' },
          { b_color: '#000' },
        ],
        b_views: 20,
      },
    ],
    data2: [],
  });
});

module.exports = app;
