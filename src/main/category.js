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
  res.send({
    data: [
      {
        categoryid: 0,
        categoryname: 'TOP',
        subcategory: ['맨투맨 & 후디 / ', '블라우스 & 셔츠 / ', '니트'],
      },
      {
        categoryid: 1,
        categoryname: 'PANTS',
        subcategory: [
          '배기 / ',
          '세미와이드 / ',
          '와이드 / ',
          '스트레이트 / ',
          '트레이닝 / ',
          '부츠',
        ],
      },
      {
        categoryid: 2,
        categoryname: 'OUTER',
        subcategory: ['코트 / ', '자켓 / ', '점퍼 / ', '가디건 / ', '조끼'],
      },
      {
        categoryid: 3,
        categoryname: 'SKIRT',
        subcategory: ['치마 / ', '원피스'],
      },
      {
        categoryid: 4,
        categoryname: 'SHOES&BAGS',
        subcategory: ['신발 / ', '가방'],
      },
    ],
  });
});

module.exports = app;
