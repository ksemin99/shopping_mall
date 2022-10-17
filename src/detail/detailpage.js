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
    let board_c_num;
    c_numsql = 'SELECT c_num FROM board WHERE b_num = ' + boardnum
    let sizesql;
    b_numsql = 'SELECT * FROM board WHERE b_num = ' + boardnum
    detailpicturesql = 'SELECT b_detail_picture_url FROM board_detail_picture WHERE b_num = ' + boardnum
    detailsql = 'SELECT b_detail_url FROM board_detail WHERE b_num = ' + boardnum

    db.query(c_numsql, (err, c_numresult) => {
        if (err) console.log(err);
        else {

            console.log(c_numresult[0].c_num);

            board_c_num = parseInt(c_numresult[0].c_num);
            switch (board_c_num) {
                case 1: sizesql = 'SELECT b_size, outseam, shoulder, across, sleeve, muscle, hem FROM board_size WHERE b_num = ' + boardnum
                    break;

                case 2: sizesql = 'SELECT b_size, outseam, waist, hip, rise, thigh, hem FROM board_size WHERE b_num = ' + boardnum
                    break;

                case 3: sizesql = 'SELECT b_size, outseam, shoulder, across, armhole, hem FROM board_size WHERE b_num = ' + boardnum
                    break;

                case 4: sizesql = 'SELECT b_size, outseam, waist, hip, hem FROM board_size WHERE b_num = ' + boardnum
                    break;

                case 5: sizesql = 'SELECT b_size, height, feet, heel FROM board_size WHERE b_num = ' + boardnum
                    break;
            }
            db.query(sizesql, (err, sizeresult) => {
                if (err) console.log(err);
                else {
                    res.send(sizeresult);
                }
            });
            //res.send(c_numresult);
        }
    });


});

module.exports = app;
