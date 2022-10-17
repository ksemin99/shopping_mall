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

app.get('/:pagenum', (req, res, next) => {
    const boardnum = req.params.pagenum;
    c_numsql = 'SELECT c_num FROM board WHERE b_num = ' + boardnum

    db.query(c_numsql, (err, detailresult) => {
        if (err) console.log(err);
        else {
            console.log(detailresult)
            console.log(detailresult.c_num)
            res.send(detailresult);
        }
    });

    b_numsql = 'SELECT * FROM board WHERE b_num = ' + boardnum
    detailpicturesql = 'SELECT b_detail_picture_url FROM board_detail_picture WHERE b_num = ' + boardnum
    detailsql = 'SELECT b_detail_url FROM board_detail WHERE b_num = ' + boardnum
    sizesql = 'SELECT * FROM board_size WHERE * is not null and b_num = ' + boardnum
    // db.query(sizesql, (err, detailresult) => {
    //     if (err) console.log(err);
    //     else {
    //         res.send(detailresult);
    //     }
    // });
});

module.exports = app;
