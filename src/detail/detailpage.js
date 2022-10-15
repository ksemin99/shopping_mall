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
    b_numsql = 'SELECT * FROM board WHERE b_num = ' + boardnum
    detailpicturesql = 'SELECT b_detail_picture_url FROM board_detail_picture WHERE b_num = ' + boardnum
    detailsql = 'SELECT b_detail_url FROM board_detail WHERE b_num = ' + boardnum
    db.query(detailsql, (err, detailresult) => {
        if (err) console.log(err);
        else {
            res.send(detailresult);
        }
    });
});

module.exports = app;
