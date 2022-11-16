const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
  let sqlresult = { data1: [] };
  const b_num = Number(req.query.b_num); // 카테고리 ID //
  const page = req.query.page; //limit ( (page - 1) * size  , 1 )
  let size = req.query.size; //limit ( (page - 1) * size  , 1 )
  const fullsort = req.query.sort;

  const splitresult = fullsort.split(',');

  const sort = splitresult[0]; //최신순//
  const standard = splitresult[1]; //

  countsql = 'SELECT COUNT(*) AS total FROM comment WHERE b_num = ' + b_num;

  db.query(countsql, (err, countresult) => {
    let newsize = 0;
    if (err) console.log(err);
    else {
      let sqlcount = [];
      for (var data of countresult) {
        sqlcount.push(data);
      }
      sqlresult['totalresult'] = sqlcount[0].total;
      sqlresult['totalpage'] = parseInt(sqlcount[0].total / 10) + 1;
      sqlresult['lastsize'] = sqlcount[0].total % 5;
      if (page * size > sqlcount[0].total) {
        newsize = sqlcount[0].total % size;
      } else {
        newsize = Number(size + '');
      }
      commentsql =
        'SELECT * FROM comment WHERE b_num = ' +
        b_num +
        ' ORDER BY ' +
        sort +
        ' ' +
        standard +
        ' limit ' +
        (page - 1) * size +
        ', ' +
        newsize;
      db.query(commentsql, (err, result) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          sqlresult.data1.push(...result);
          res.send(sqlresult);
        }
      });
    }
    // const b_num = parseInt(req.params.b_num);
    // let sqlresult = {
    //   data1: [
    //     {
    //       addcommentb_num: b_num,
    //       addcommenname: '상품 리뷰 작성하기',
    //     }
    //   ],
    //   data2: []
    // };
    // showcommentsql = 'SELECT * FROM comment WHERE b_num = ' + b_num;
    // db.query(showcommentsql, (err, result) => {
    //   if (err) console.log(err);
    //   else {
    //     sqlresult.data2.push(...result);
    //     res.send(sqlresult);
    //   }
    // });
  });
});
module.exports = app;
