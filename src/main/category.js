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
      categoryname: 'new',
    },
    {
      categoryid: 1,
      categoryname: 'best',
    },
    {
      categoryid: 2,
      categoryname: 'top',
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
      categoryid: 3,
      categoryname: 'pants',
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
      categoryid: 4,
      categoryname: 'outer',
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
      categoryid: 5,
      categoryname: 'skirt',
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
      categoryid: 6,
      categoryname: 'shoes&bags',
      subcategory: [
        {
          subcategoryname: '신발 /',
        },
        {
          subcategoryname: '가방 /',
        },
      ],
    },
  ]);
});

module.exports = app;
