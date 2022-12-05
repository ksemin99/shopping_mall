const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser')

const checkauthorization = require('../auth/checkauthorization');

app.use(cookieParser('secretKey'))

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.post('/', checkauthorization.authenticateToken, (req, res, next) => {
    const id = req.query.id;                        // 비로그인시 id는 "" 받기
    const b_num = Number(req.query.b_num);
    const opt_color = req.query.opt_color;
    const opt_size = Number(req.query.opt_size);
    const opt_count = req.query.opt_count;
    const cookie = req.signedCookies.key;

    addbasketsql = 'INSERT INTO basket VALUES (' +
        id + ', ' +
        b_num + ', ' +
        opt_color + ', ' +
        opt_size + ', ' +
        opt_count + ', ' +
        cookie + ')'

    db.query(addbasketsql, (err, addbasketresult) => {
        if (err) console.log(err);
        else {
            res.send(addbasketresult);
        }
    });
});

module.exports = app;
