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
// auth //
const login = require('./src/auth/login');
const logout = require('./src/auth/logout');
const newuser = require('./src/auth/newuser');
const token = require('./src/auth/token');
const newidcheck = require('./src/auth/newidcheck');
const checkauthorization = require('./src/auth/checkauthorization');
// category //
const category = require('./src/main/category');
const categoryrecent = require('./src/main/categoryrecent');
const recent = require('./src/main/recent');
// detail //
const addcomment = require('./src/detail/addcomment');
const basket = require('./src/detail/basket');
const addbasket = require('./src/detail/addbasket');
const deletecomment = require('./src/detail/deletecomment');
const detailpage = require('./src/detail/detailpage');
// const likecomment = require('./src/detail/likecomment');
const updatecomment = require('./src/detail/updatecomment');
const showcomment = require('./src/detail/showcomment');
const showbasket = require('./src/detail/showbasket');
const checklogin = require('./src/detail/checklogin');

app.use(express.static(path.join(__dirname, 'src')));
// auth //
app.use('/auth/login', login);
app.use('/auth/logout', logout);
app.use('/auth/newuser', newuser);
app.use('/auth/token', token);
app.use('/auth/newidcheck', newidcheck);
// category //
app.use('/category', category);
app.use('/categoryrecent', categoryrecent);
app.use('/recent', recent);
// detail //
app.use('/detail/addcomment', addcomment);
app.use('/detail/basket', basket);
app.use('/detail/addbasket', addbasket);
app.use('/detail/deletecomment', deletecomment);
app.use('/detail/detailpage', detailpage);
// app.use('/detail/likecomment', likecomment);
app.use('/detail/updatecomment', updatecomment);
app.use('/detail/showcomment', showcomment);
app.use('/detail/showbasket', showbasket);
app.use('/detail/checklogin', checklogin);

// const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const { request, json } = require('express');
const db = mysqlConObj.init();

https: app.use(express.json());
app.use(cors());

dotenv.config();

let cookieParser = require('cookie-parser');

app.use(cookieParser());

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
app.get('/', function (req, res) {
  res.send('<h1>Express Simple Server</h1>');
});
app.get('/getcookie', function (req, res) {
  res.send(req.cookies);
});
app.get('/setcookie', function (req, res) {
  // 쿠키 생성.
  res.cookie('string', 'cookie');
  res.cookie('json', {
    name: 'mingyu',
    data: 100
  });
  res.redirect('/getcookie'); // 경로 이동.
});

