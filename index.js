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

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
