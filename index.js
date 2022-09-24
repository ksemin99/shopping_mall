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
const categorymain = require('./src/main/categorymain');

const recent = require('./src/main/recent');

app.use(express.static(path.join(__dirname, 'src')));
app.use('/auth/login', login);
app.use('/auth/logout', logout);
app.use('/auth/newuser', newuser);
app.use('/auth/token', token);
app.use('/auth/newidcheck', newidcheck);

app.use('/category', category);

//app.use('/main', categorymain);
app.use('/recent', recent);

//const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

https: app.use(express.json());
app.use(cors());

dotenv.config();

// app.get('/', (req, res, next) => {
//   mainsql = ''; //카테고리별 4개씩 들고오기

//   db.query(mainsql, (err, result) => {
//     if (err) console.log(err);
//     else console.log(result, 'sql 성공');
//   });

//   res.send({
//     picture: '',
//     color: '',
//     dressname: '',
//     dressprice: '',
//     views: '',
//   });
// });

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
