const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();
const cookieParser = require('cookie-parser')

app.use(cookieParser('secretKey'))

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
    const id = req.query.id
    const cookie = req.signedCookies.key
    if (id != "") {
        showbasketsql = 'SELECT * FROM basket WHERE id = ' + id
    } else {
        showbasketsql = 'SELECT * FROM basket WHERE id = "" AND cookie = ' + cookie
    }
    db.query(showbasketsql, (err, showbasketresult) => {
        if (err) console.log(err);
        else {
            res.send(showbasketresult);
        }
    });
});

module.exports = app;
