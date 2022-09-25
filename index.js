const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const PORT = 3000;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const login = require('./src/auth/login');
const logout = require('./src/auth/logout');
const newuser = require('./src/auth/newuser');
const token = require('./src/auth/token');
const newidcheck = require('./src/auth/newidcheck');
const checkauthorization = require('./src/auth/checkauthorization');

const category = require('./src/main/category');
const categoryrecent = require('./src/main/categoryrecent');

const recent = require('./src/main/recent');

app.use(express.static(path.join(__dirname, 'src')));
app.use('/auth/login', login);
app.use('/auth/logout', logout);
app.use('/auth/newuser', newuser);
app.use('/auth/token', token);
app.use('/auth/newidcheck', newidcheck);

app.use('/category', category);

app.use('/categoryrecent', categoryrecent);
app.use('/recent', recent);

//const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const { request, json } = require('express');
const db = mysqlConObj.init();

https: app.use(express.json());
app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
  let sqlresult = { data1: [], data2: [] };
  let semi = [];
  let test = [{ ss: 'q', ss: 'w', ss: 'e' }];
  testsql =
    'SELECT DISTINCT b.b_name, b.b_url, b.b_price, b.b_views FROM board b, board_detail bd WHERE b.b_num = bd.b_num ORDER BY b.b_views desc limit 4';
  testsql2 =
    'SELECT DISTINCT bd.b_color FROM board b, board_detail bd WHERE b.b_num = bd.b_num AND bd.b_num = (SELECT b_num FROM board ORDER BY b_views desc limit 1)';
  db.query(testsql, (err, result) => {
    if (err) console.log(err);
    else {
      //console.log(result);
      //res.send(result);
      sqlresult.data1.push(...result);
      sqlresult.data1[0].id = 1;
      sqlresult.data1[1].id = 2;
      sqlresult.data1[2].id = 3;
      sqlresult.data1[3].id = 4;
    }
  });
  db.query(testsql2, (err, result) => {
    if (err) console.log(err);
    else {
      for (let data of result) {
        semi.push(data.b_color);
      }
      console.log(semi);
      sqlresult.data1[0].b_color = semi;
      // sqlresult.data1[0].b_color = result;

      res.send(sqlresult);
    }
  });
});

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
