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
  res.send([
    {
      categoryid: 0,
      categoryname: 'TOP',
      subcategory: [
        {
          subcategoryname: '맨투맨 & 후디 /',
        },
        {
          subcategoryname: '블라우스 & 셔츠 /',
        },
        {
          subcategoryname: '니트',
        },
      ],
    },
    {
      categoryid: 1,
      categoryname: 'PANTS',
      subcategory: [
        {
          subcategoryname: '배기 /',
        },
        {
          subcategoryname: '세미와이드 /',
        },
        {
          subcategoryname: '와이드 /',
        },
        {
          subcategoryname: '스트레이트 /',
        },
        {
          subcategoryname: '트레이닝 /',
        },
        {
          subcategoryname: '부츠',
        },
      ],
    },
    {
      categoryid: 2,
      categoryname: 'OUTER',
      subcategory: [
        {
          subcategoryname: '코트 /',
        },
        {
          subcategoryname: '자켓 /',
        },
        {
          subcategoryname: '점퍼 /',
        },
        {
          subcategoryname: '가디건 /',
        },
        {
          subcategoryname: '조끼',
        },
      ],
    },
    {
      categoryid: 3,
      categoryname: 'SKIRT',
      subcategory: [
        {
          subcategoryname: '치마 /',
        },
        {
          subcategoryname: '원피스',
        },
      ],
    },
    {
      categoryid: 4,
      categoryname: 'SHOES&BAGS',
      subcategory: [
        {
          subcategoryname: '신발 /',
        },
        {
          subcategoryname: '가방',
        },
      ],
    },
  ]);
});

module.exports = app;
