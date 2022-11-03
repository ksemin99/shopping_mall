const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
    let login = true
    const id = req.query.id
    const cookie = req.cookies  // 나중에 value값으로 바꾸기
    if (login == true) {
        showbasketsql = 'SELECT * FROM basket WHERE id = ' + id
    } else {
        showbasketsql = 'SELECT * FROM basket WHERE id = "" AND cookie = ' + cookie
    }
    db.query(showbasketsql, (err, showbasketresult) => {
        let newsize = 0;
        if (err) console.log(err);
        else {
            res.send(showbasketresult);
        }
    });
});

module.exports = app;
