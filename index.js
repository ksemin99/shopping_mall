const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const PORT = 3000;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const http = require('http');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

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

// const addcomment = require('./src/detail/addcomment');
// const basket = require('./src/detail/basket');
const addbasket = require('./src/detail/addbasket');
// const deletecomment = require('./src/detail/deletecomment');
const detailpage = require('./src/detail/detailpage');
// const likecomment = require('./src/detail/likecomment');
// const updatecomment = require('./src/detail/updatecomment');

app.use(express.static(path.join(__dirname, 'src')));
app.use('/auth/login', login);
app.use('/auth/logout', logout);
app.use('/auth/newuser', newuser);
app.use('/auth/token', token);
app.use('/auth/newidcheck', newidcheck);

app.use('/category', category);
app.use('/categoryrecent', categoryrecent);
app.use('/recent', recent);

// app.use('/detail/addcomment', addcomment);
// app.use('/detail/basket', basket);
app.use('/detail/addbasket', addbasket);
// app.use('/detail/deletecomment', deletecomment);
app.use('/detail/detailpage', detailpage);
// app.use('/detail/likecomment', likecomment);
// app.use('/detail/updatecomment', updatecomment);

//const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const { request, json } = require('express');
const db = mysqlConObj.init();

https: app.use(express.json());
app.use(cors());

dotenv.config();

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
