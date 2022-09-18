const express = require('express');
const app = express();

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.post('/', function (req, res) {
  const id = req.body.id;
  const pw = req.body.pw;
  const pwchk = req.body.pwchk;
  const { name, sex } = req.body;
  idchksql = "SELECT id FROM users WHERE id = '" + id + "';";
  db.query(idchksql, (err, idresult) => {
    if (err) console.log(err);
    else {
      if (idresult == id) {
        res.send('꺼져');
      } else {
        if (id.replace(/(\s*)/g, '').length >= 4) {
          // DB에서 id 중복확인
          if (
            pw.replace(/(\s*)/g, '').length >= 8 &&
            pw.replace(/(\s*)/g, '').length <= 20
          ) {
            if (pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) > 0) {
              if (pw === pwchk) {
                res.send('굳');
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
                  else console.log(result, 'mysql 성공');
                });
              } else {
                res.send('꺼져');
              }
            } else {
              res.send('꺼져');
            }
          } else {
            res.send('꺼져');
          }
        } else {
          res.send('꺼져');
        }
      }
    }
  });
});

module.exports = app;
