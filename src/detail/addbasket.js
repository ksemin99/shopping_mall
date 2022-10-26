const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
cookieParser = require('cookie-parser');
app.use(cookieParser());


const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
    res.cookie('string', 'cookie');
    res.cookie('json', {
        name: 'cookie',
        property: 'delicious'
    });
    res.send(cookies)
});

module.exports = app;
