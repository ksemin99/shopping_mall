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
// b_num을 이용해 b_url 사진 주소 가져오기, 
// b_num을 이용해 b_name 상품이름 가져오기, 
// b_num을 이용해 b_price 상품가격 가져오기
app.get('/', (req, res, next) => {
    const id = req.query.id
    const cookie = req.signedCookies.key

    // boardinfosql = 'SELECT b_url, b_name, b_price FROM board WHERE b_num = ' + b_num;
    if (id != "") {
        showbasketsql = 'SELECT * FROM basket WHERE id = ' + id
    } else {
        showbasketsql = 'SELECT * FROM basket WHERE id = "" AND cookie = ' + cookie
    }
    db.query(showbasketsql, (err, showbasketresult) => {
        if (err) console.log(err);
        else {
            res.send(showbasketresult[1].key)
        }
    });
});

module.exports = app;
