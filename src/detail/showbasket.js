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
    console.log("r + h + c : " + req.headers.cookie);
    console.log("r + h : " + req.headers);
    console.log("r : " + req);
    if (req.headers.cookie) {
        console.log(req.headers.cookie);
    }
    res.send(req.headers)
});

module.exports = app;
