const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const checkauthorization = require('../auth/checkauthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', checkauthorization.authenticateToken, (req, res, next) => {
  console.log(req.body.accesskey);
  res.send('메인 페이지 연결 완료');
});
app.get('/:new', checkauthorization.authenticateToken, (req, res, next) => {
  res.send('new 연결 완료');
});
app.get('/:best', checkauthorization.authenticateToken, (req, res, next) => {
  res.send('best 연결 완료');
});
app.get('/:top', checkauthorization.authenticateToken, (req, res, next) => {
  res.send('top 연결 완료');
});
app.get('/:pants', checkauthorization.authenticateToken, (req, res, next) => {
  res.send('pants 연결 완료');
});
app.get('/:outer', checkauthorization.authenticateToken, (req, res, next) => {
  res.send('outer 연결 완료');
});
app.get('/:skirt', checkauthorization.authenticateToken, (req, res, next) => {
  res.send('skirt 연결 완료');
});
app.get(
  '/:shoes&bags',
  checkauthorization.authenticateToken,
  (req, res, next) => {
    res.send('shoes&bags 연결 완료');
  }
);

module.exports = app;
