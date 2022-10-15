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
    detailsql = 'SELECT * FROM board WHERE b_num = ' + boardnum
    detailpicturesql = 'SELECT * FROM board_detail_picture WHERE b_num = ' + boardnum
    db.query(detailpicturesql, (err, detailresult) => {
        if (err) console.log(err);
        else {
            res.send(detailresult);
        }
    });
});

module.exports = app;
