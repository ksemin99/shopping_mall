const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const checkauthorization = require('../auth/checkauthorization');
const mainfunction = require('./mainfunction');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
  let sqlresult = { data1: [] };
  const categoryid = Number(req.query.categoryid); // 카테고리 ID //
  const search = req.query.search;
  const page = req.query.page; //limit ( (page - 1) * size  , 1 )
  let size = req.query.size; //limit ( (page - 1) * size  , 1 )
  const pullsort = req.query.sort;

  const splitresult = pullsort.split(',');

  console.log(splitresult);

  const sort = splitresult[0]; //낮은가격, 높은가격, 최신순, 조회순//
  const standard = splitresult[1]; //

  // DB로 categoryid 별 애들 불러오기

  let category = 0;
  let categorysql = '초기';
  switch (categoryid) {
    case 2:
      category = 1;
      break;
    case 3:
      category = 2;
      break;
    case 4:
      category = 3;
      break;
    case 5:
      category = 4;
      break;
    case 6:
      category = 5;
      break;
  }

  if (search != undefined) {
    countsql =
      'SELECT COUNT(DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time) as total FROM board b, board_color bc WHERE b.b_num = bc.bc_num AND b.c_num = ' +
      category +
      " AND b.b_name LIKE '%" +
      search +
      "%'";
  } else {
    if (categoryid == 0 || categoryid == 1) {
      countsql =
        'SELECT COUNT(DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time) as total FROM board b, board_color bc WHERE b.b_num = bc.bc_num';
    } else {
      countsql =
        'SELECT COUNT(DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time) as total FROM board b, board_color bc WHERE b.b_num = bc.bc_num and b.c_num = ' +
        category;
      console.log(countsql);
    }
  }

  db.query(countsql, (err, countresult) => {
    let newsize = 0;
    if (err) {
      console.log(err);
      return err;
    } else {
      let sqlcount = [];
      for (var data of countresult) {
        sqlcount.push(data);
      }
      if (page * size > sqlcount[0].total) {
        newsize = sqlcount[0].total % size;
      } else {
        newsize = Number(size + '');
        console.log(newsize);
      }
      if (search != undefined) {
        categorysql =
          'SELECT DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time FROM board b, board_color bc WHERE b.b_num = bc.bc_num AND b.c_num = ' +
          category +
          " AND b.b_name LIKE '%" +
          search +
          "%' ORDER BY b." +
          sort +
          ' ' +
          standard +
          ' limit ' +
          (page - 1) * size +
          ', ' +
          newsize;
      } else {
        if (categoryid == 0 || categoryid == 1) {
          categorysql =
            'SELECT DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time FROM board b, board_color bc WHERE b.b_num = bc.bc_num ORDER BY b.' +
            sort +
            ' ' +
            standard +
            ' limit ' +
            (page - 1) * size +
            ', ' +
            newsize;
          console.log('2');
        } else {
          categorysql =
            'select DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time from board b, board_color bc where b.b_num = bc.bc_num and b.c_num = ' +
            category +
            ' ORDER BY b.' +
            sort +
            ' ' +
            standard +
            ' limit ' +
            (page - 1) * size +
            ', ' +
            newsize;
          console.log('3');
        }
      }

      db.query(categorysql, (err, result) => {
        console.log('디비 들어옴');
        if (err) {
          console.log(err);
          return err;
        } else {
          console.log('에러 아님');
          sqlresult.data1.push(...result);
          let count = 0;
          console.log((page - 1) * size + newsize);
          for (
            let q = (page - 1) * size;
            q < (page - 1) * size + newsize;
            q++
          ) {
            console.log('for문');
            if (search != undefined) {
              console.log(search);
              colorsql =
                'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND b.c_num = ' +
                category +
                " AND b.b_name LIKE '%" +
                search +
                "%' AND bc.bc_num = (SELECT b_num FROM board WHERE b_name LIKE '%" +
                search +
                "%' ORDER BY " +
                sort +
                ' ' +
                standard +
                ' limit ' +
                q +
                ', 1)';
            } else {
              console.log(categoryid + '화기ㅣㄴ');
              if (categoryid == 0 || categoryid == 1) {
                colorsql =
                  'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board ORDER BY ' +
                  sort +
                  ' ' +
                  standard +
                  ' limit ' +
                  q +
                  ', 1)';
                console.log('4');
              } else {
                colorsql =
                  'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board where c_num = ' +
                  category +
                  ' ORDER BY ' +
                  sort +
                  ' ' +
                  standard +
                  ' limit ' +
                  q +
                  ', 1)';
                console.log('5');
              }
            }
            let semi = [];
            let dummy = [];
            db.query(colorsql, (err, secondresult) => {
              if (err) console.log(err);
              else {
                for (let data of secondresult) {
                  semi.push(data);
                }
                console.log(sqlresult.data1[count]);
                sqlresult.data1[count].b_color = dummy.concat(...semi);
                count++;
              }

              if (q == (page - 1) * size + newsize - 1) {
                console.log('완료');
                res.send(sqlresult);
              }
            });
          }
        }
      });
    }
  });
});

module.exports = app;
