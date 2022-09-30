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
  let sqlcount = 0;

  const splitresult = pullsort.split(',');

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

  function changesize() {
    if (search != undefined) {
      countsql =
        "SELECT COUNT(DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time) FROM board b, board_color bc WHERE b.b_num = bc.bc_num AND b.b_name LIKE '%" +
        search +
        "%'";
    } else {
      countsql =
        'SELECT COUNT(DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time) FROM board b, board_color bc WHERE b.b_num = bc.bc_num';
    }

    db.query(countsql, (err, countresult) => {
      if (err) console.log(err);
      else {
        for (var data of countresult) {
          sqlcount.push(data.title);
        }
        console.log(sqlcount.title);
        console.log('언제해...?');
        console.log(page * size);
      }
      if (page * size > sqlcount) {
        size = sqlcount % size;
        console.log('언제해...?');
      }
    });
  }

  console.log(size);
  async function getsql() {
    await changesize();
    console.log('사이즈 ' + size);
    if (search != undefined) {
      categorysql =
        "SELECT DISTINCT b.b_name, b.b_url, b.b_price, b.b_views, b.b_time FROM board b, board_color bc WHERE b.b_num = bc.bc_num AND b.b_name LIKE '%" +
        search +
        "%' ORDER BY b." +
        sort +
        ' ' +
        standard +
        ' limit ' +
        (page - 1) * size +
        ', ' +
        size;
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
          size;
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
          size;
      }
    }

    db.query(categorysql, (err, result) => {
      if (err) console.log(err);
      else {
        sqlresult.data1.push(...result);
        let count = 0;
        for (let q = (page - 1) * size; q < size; q++) {
          if (search != undefined) {
            colorsql =
              "SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND b.b_name LIKE '%" +
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
            if (categoryid == 0 || categoryid == 1) {
              colorsql =
                'SELECT bc.b_color FROM board b, board_color bc WHERE bc.bc_num = b.b_num AND bc.bc_num = (SELECT b_num FROM board ORDER BY ' +
                sort +
                ' ' +
                standard +
                ' limit ' +
                q +
                ', 1)';
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
              sqlresult.data1[count].b_color = dummy.concat(...semi);
              count++;
            }
            if (q == size - 1) res.send(sqlresult);
          });
        }
      }
    });
  }
  getsql();
});

module.exports = app;
