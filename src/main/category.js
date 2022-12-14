const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
  res.send({
    data1: [
      {
        categoryid: 0,
        categoryname: 'NEW',
        subcategory: ['신상품 매일 자정 오픈'],
      },
      {
        categoryid: 1,
        categoryname: 'BEST',
        subcategory: ['가장 많이 조회한 상품'],
      },
    ],
    data2: [
      {
        categoryid: 2,
        categoryname: 'TOP',
        subcategory: ['맨투맨 & 후디 / ', '블라우스 & 셔츠 / ', '니트'],
      },
      {
        categoryid: 3,
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
        categoryid: 4,
        categoryname: 'OUTER',
        subcategory: ['코트 / ', '자켓 / ', '점퍼 / ', '가디건 / ', '조끼'],
      },
      {
        categoryid: 5,
        categoryname: 'SKIRT',
        subcategory: ['치마 / ', '원피스'],
      },
      {
        categoryid: 6,
        categoryname: 'SHOES&BAGS',
        subcategory: ['신발 / ', '가방'],
      },
    ],
  });
});

module.exports = app;
