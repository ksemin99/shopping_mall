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

    let sqlresult = { data1: [] };
    const boardnum = req.params.pagenum;
    let board_c_num;
    let sizesql;
    b_numsql = 'SELECT * FROM board WHERE b_num = ' + boardnum
    detailpicturesql = 'SELECT b_detail_picture_url FROM board_detail_picture WHERE b_num = ' + boardnum
    detailsql = 'SELECT b_detail_url FROM board_detail WHERE b_num = ' + boardnum
    db.query(b_numsql, (err, result) => {

        sqlresult.data1.push(...result);
        board_c_num = parseInt(sqlresult.data1[0].c_num);
        console.log(board_c_num)
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
        db.query(detailpicturesql, (err, detailpictureresult) => {
            if (err) console.log(err);
            else {
                let semi = [];
                let dummy = [];
                for (let data of detailpictureresult) {
                    semi.push(data);
                }
                sqlresult.data1[0].detailpicture_url = dummy.concat(...semi);
            }
            db.query(detailsql, (err, detailresult) => {
                if (err) console.log(err);
                else {
                    let semi = [];
                    let dummy = [];
                    sqlresult.data1[0].detail_url.push(detailresult)
                    res.send(sqlresult);
                    // for (let data of detailresult) {
                    //     semi.push(data);
                    // }
                    // sqlresult.data1[0].detail_url = dummy.concat(...semi);
                }
                // db.query(sizesql, (err, sizeresult) => {
                //     if (err) console.log(err);
                //     else {
                //         let semi = [];
                //         let dummy = [];
                //         for (let data of sizeresult) {
                //             semi.push(data);
                //         }
                //         sqlresult.data1[0].b_size = dummy.concat(...semi);
                //         res.send(sqlresult);
                //     }
                // });

            });
        });

    });


});

module.exports = app;
