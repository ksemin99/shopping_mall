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
        basketid: 0,
        basketbutton: '쇼핑계속하기',
      },
      {
        basketid: 1,
        basketbutton: '선택 상품 삭제',
      },
      {
        basketid: 2,
        basketbutton: '장바구니 비우기',
      },
      {
        basketid: 3,
        basketbutton: '전체상품주문',
      },
      {
        basketid: 4,
        basketbutton: '선택상품주문',
      },
    ],
  });
});

module.exports = app;
