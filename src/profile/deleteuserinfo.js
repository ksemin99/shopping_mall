const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();
const cookieParser = require('cookie-parser');

app.use(cookieParser('secretKey'));

app.use(cors());

dotenv.config();

app.delete('/', (req, res, next) => {
  const id = req.body.id;
  // const pw = req.body.pw;
  basketdeletesql = 'DELETE FROM basket WHERE id = "' + id + '"';
  commentdeletesql = 'DELETE FROM comment WHERE id = "' + id + '"';
  usersdeletesql = 'DELETE FROM users WHERE id = "' + id + '"';
  console.log(basketdeletesql);
  console.log(commentdeletesql);
  console.log(usersdeletesql);

  db.query(basketdeletesql, (err, basketdeleteresult) => {
    if (err) console.log(err);
    else {
      db.query(commentdeletesql, (err, commentdeleteresult) => {
        if (err) console.log(err);
        else {
          db.query(usersdeletesql, (err, usersdeleteresult) => {
            if (err) console.log(err);
            else {
              res.send('ㄱ');
            }
          });
        }
      });
    }
  });
});

module.exports = app;
