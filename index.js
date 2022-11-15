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
const addcomment = require('./src/detail/comment/addcomment');
const basket = require('./src/detail/basket');
const addbasket = require('./src/detail/addbasket');
const deletecomment = require('./src/detail/comment/deletecomment');
const detailpage = require('./src/detail/detailpage');
// const likecomment = require('./src/detail/likecomment');
const updatecomment = require('./src/detail/comment/updatecomment');
const showcomment = require('./src/detail/comment/showcomment');
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


const fs = require("fs");


app.use(cookieParser('secretKey'));
// app.use(cookieParser());
let count = 0;
app.listen(PORT, function () {
  const dir = "./img";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log('server listening on port 3000');
});
app.get('/', function (req, res) {
  const cookieConfig = {
    httpOnly: true,
    maxAge: 100000,
    signed: true
  };
  if (req.signedCookies.key) {
    console.log(req.signedCookies.key);
  } else {
    count++;
    res.cookie('key', count, cookieConfig);
    console.log(req.signedCookies.key);
  }
  res.send('<h1>Express Simple Server</h1>');
});