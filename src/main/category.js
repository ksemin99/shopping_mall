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
    maincategory: [
      {
        categoryid: 0,
        categoryname: 'TOP',
      },
      {
        categoryid: 1,
        categoryname: 'PANTS',
      },
      {
        categoryid: 2,
        categoryname: 'OUTER',
      },
      {
        categoryid: 3,
        categoryname: 'SKIRT',
      },
      {
        categoryid: 4,
        categoryname: 'SHOES&BAGS',
      },
    ],
    subcategory: [
      {
        subcategoryid: 0,
        subcategoryname: '맨투맨 & 후디 /',
      },
      {
        subcategoryid: 1,
        subcategoryname: '블라우스 & 셔츠 /',
      },
      {
        subcategoryid: 2,
        subcategoryname: '니트',
      },
      {
        subcategoryid: 3,
        subcategoryname: '배기 /',
      },
      {
        subcategoryid: 4,
        subcategoryname: '세미와이드 /',
      },
      {
        subcategoryid: 5,
        subcategoryname: '와이드 /',
      },
      {
        subcategoryid: 6,
        subcategoryname: '스트레이트 /',
      },
      {
        subcategoryid: 7,
        subcategoryname: '트레이닝 /',
      },
      {
        subcategoryid: 8,
        subcategoryname: '부츠',
      },
      {
        subcategoryid: 9,
        subcategoryname: '코트 /',
      },
      {
        subcategoryid: 10,
        subcategoryname: '자켓 /',
      },
      {
        subcategoryid: 11,
        subcategoryname: '점퍼 /',
      },
      {
        subcategoryid: 12,
        subcategoryname: '가디건 /',
      },
      {
        subcategoryid: 13,
        subcategoryname: '조끼',
      },
      {
        subcategoryid: 14,
        subcategoryname: '치마 /',
      },
      {
        subcategoryid: 15,
        subcategoryname: '원피스',
      },
      {
        subcategoryid: 16,
        subcategoryname: '신발 /',
      },
      {
        subcategoryid: 17,
        subcategoryname: '가방',
      },
    ],
  });
});

module.exports = app;
