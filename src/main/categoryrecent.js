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
  let categorysql;
  // DB로 categoryid 별 애들 불러오기
  const categoryid = req.params.categoryid;
  //const page = req.params.page;
  switch (categoryid) {
    case 0: //new 카테고리 별로 제일 최근꺼 그냥 쫙
      categorysql = 'SELECT * FROM board ORDER BY b_time DESC';
      break;
    case 1: //best 조회수 높은 순
      categorysql = 'select * from board order by b_views desc';
      break;
    case 2: //top 탑 명시 되어있는 거
      categorysql = 'select * from board where c_num = 1';
      break;
    case 3: //pants
      categorysql = 'select * from board where c_num = 2';
      break;
    case 4: //outer
      categorysql = 'select * from board where c_num = 3';
      break;
    case 5: //skirt
      categorysql = 'select * from board where c_num = 4';
      break;
    case 6: //shoes&bags
      categorysql = 'select * from board where c_num = 5';
      break;
  }

  db.query(categorysql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
  });

  res.send({
    picture: '',
    dressname: '',
    dressprice: '',
    views: '',
  });
});

module.exports = app;
