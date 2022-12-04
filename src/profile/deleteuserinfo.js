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
  deletesql = 'DELETE FROM users WHERE id = "' + id + '"';
  console.log(deletesql);
  db.query(deletesql, (err, deleteresult) => {
    if (err) console.log(err);
    else {
      res.send(deletesql);
    }
  });
});

module.exports = app;
