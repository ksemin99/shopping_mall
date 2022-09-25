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

app.get('/:categoryid', (req, res, next) => {
  // DB로 categoryid 별 애들 불러오기
  const categoryid = req.params.categoryid;
  //const page = req.params.page;
  switch (categoryid) {
    case 0: //new
      categorysql =
        'SELECT * FROM category JOIN board on category.c_num = board.c_num AND ORDER BY ';
      break;
    case 1: //best
      categorysql =
        'SELECT * FROM category JOIN board on category.c_num = board.c_num AND ORDER BY views(DESC)';
      break;
    case 2: //top
      categorysql =
        'SELECT * FROM category JOIN board on category.c_num = board.c_num AND c_name = top';
      break;
    case 3: //pants
      categorysql =
        'SELECT * FROM category JOIN board on category.c_num = board.c_num AND c_name = pants';
      break;
    case 4: //outer
      categorysql =
        'SELECT * FROM category JOIN board on category.c_num = board.c_num AND c_name = outer';
      break;
    case 5: //skirt
      categorysql =
        'SELECT * FROM category JOIN board on category.c_num = board.c_num AND c_name = skirt';
      break;
    case 6: //shoes&bags
      categorysql =
        'SELECT * FROM category JOIN board on category.c_num = board.c_num AND c_name = shoesbags';
      break;
  }

  db.query(categorysql, (err, result) => {
    if (err) console.log(err);
    else console.log(result, 'sql 성공');
  });

  res.send({
    picture: '',
    color: '',
    dressname: '',
    dressprice: '',
    views: '',
  });
});

module.exports = app;
