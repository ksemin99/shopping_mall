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

app.delete('/', (req, res, next) => {
  const b_num = req.body.b_num;
  const u_num = req.body.u_num;
  deletesql =
    "DELETE FROM comment WHERE b_num = '" +
    b_num +
    "' AND u_num = '" +
    u_num +
    "'";
  db.query(deletesql, (err, deleteresult) => {
    if (err) console.log(err);
    else {
      console.log("삭제성공");
    }
  });
});

module.exports = app;