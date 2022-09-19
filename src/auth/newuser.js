const express = require('express');
const app = express();
const cors = require('cors');
const checkAuthorization = require('./checkAuthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

app.post('/', function (req, res) {
  const id = req.body.id;
  const pw = req.body.pw;
  const { name, sex } = req.body;

  if (id.replace(/(\s*)/g, '').length >= 4) {
    if (
      pw.replace(/(\s*)/g, '').length >= 8 &&
      pw.replace(/(\s*)/g, '').length <= 20
    ) {
      if (pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) > 0) {
        res.send({ newuser: id });
        sql =
          "insert into users(id, pwd, name, sex) values ('" +
          id +
          "','" +
          pw +
          "','" +
          name +
          "','" +
          sex +
          "');";

        db.query(sql, (err, result) => {
          if (err) console.log(err);
          else console.log(result, '데베에 삽입 성공');
        });
      } else {
        res.send('특수문자가 들어가지 않음');
        console.log('특수문자가 들어가지 않음');
      }
    } else {
      res.send('비밀번호가 8자리 이상, 20자리 이하가 아님');
      console.log('비밀번호가 8자리 이상, 20자리 이하가 아님');
    }
  } else {
    res.send('아이디가 4글자 이상이 아님');
    console.log('아이디가 4글자 이상이 아님');
  }
});

module.exports = app;
