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
  let categorysql = '';
  // DB로 categoryid 별 애들 불러오기
  const categoryid = Number(req.params.categoryid);
  //const page = req.params.page;
  switch (categoryid) {
    case 0: //new 카테고리 별로 제일 최근꺼 그냥 쫙
      categorysql =
        'SELECT b.b_name, b.b_url, b.b_price, b.b_views FROM board b, board_color bc WHERE b.b_num = bc.bc_num ORDER BY b.b_time desc';
      colorsql =
        'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board ORDER BY b_time desc)';
      break;
    case 1: //best 조회수 높은 순
      categorysql =
        'SELECT DISTINCT b.b_name, b.b_url, b.b_price, b.b_views FROM board b, board_color bc WHERE b.b_num = bc.bc_num ORDER BY b.b_views desc';
      colorsql =
        'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board ORDER BY b_views desc)';
      break;
    case 2: //top 탑 명시 되어있는 거
      categorysql =
        'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 1';
      colorsql =
        'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 1 ORDER BY b_views desc)';
      break;
    case 3: //pants
      categorysql =
        'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 2';
      colorsql =
        'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 2 ORDER BY b_views desc)';
      break;
    case 4: //outer
      categorysql =
        'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 3';
      colorsql =
        'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 3 ORDER BY b_views desc)';
      break;
    case 5: //skirt
      categorysql =
        'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 4';
      colorsql =
        'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 4 ORDER BY b_views desc)';
      break;
    case 6: //shoes&bags
      categorysql =
        'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = 5';
      colorsql =
        'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = 5 ORDER BY b_views desc)';
      break;
  }
  let sqlresult = { data1: [] };
  let kcount = 0;
  db.query(categorysql, (err, result) => {
    if (err) console.log(err);
    else {
      sqlresult.data1.push(...result);
      kcount = result.length;
      console.log(kcount);
    }
  });
  console.log(kcount + 'ww');
  for (k = 0; k < kcount; k++) {
    let semi = [];
    let dummy = [];
    db.query(colorsql, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        sqlresult.data1[k].b_color = dummy.concat(...semi);
      }
      console.log(kcount + ' 두번');
      if (k == kcount - 1) res.send(sqlresult);
    });
  }
});

module.exports = app;
