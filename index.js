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
  let test = [];
  let test1 = [];
  testsql =
    'SELECT DISTINCT b.b_name, b.b_url, b.b_price, b.b_views FROM board b, test bc WHERE b.b_num = bc.bc_num ORDER BY b.b_views desc limit 4';

  testsql3 =
    'SELECT bc.b_color FROM board b, test bc WHERE bc.bc_num = (SELECT b_num FROM board ORDER BY b_views desc) limit 4';
  qwe =
    'SELECT bc.* FROM board_best bb, board_color bc WHERE bb.b_num = bc.bc_num limit 4';

  db.query(testsql, (err, result) => {
    if (err) console.log(err);
    else {
      sqlresult.data1.push(...result);
      // test.data1.push(...result);
      // console.log(sqlresult);
      // test.data1.push(...result);
      // res.send(test);
    }
  });
  for (let k = 0; k < 4; k++) {
    testsql2 =
      'SELECT bc.b_color FROM board b, test bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board ORDER BY b_views desc limit ' +
      k +
      ', 1)';
    db.query(testsql2, (err, result) => {
      if (err) console.log(err);
      else {
        for (let data of result) {
          semi.push(data);
        }
        test1 = test.concat(...semi);
        sqlresult.data1[k].b_color = test1;

        res.send(sqlresult);
      }
    });
  }
});

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
