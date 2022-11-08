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

app.post('/', checkauthorization.authenticateToken, (req, res, next) => {
  console.log(req);
  const b_num = Number(req.query.b_num);
  const u_num = Number(req.query.u_num);
  const id = Number(req.query.id);
  const comment = Number(req.query.comment);

  comment_sql =
    "insert into comment(b_num, u_num, id, comment) values('" +
    b_num +
    "','" +
    u_num +
    "','" +
    id +
    "','" +
    comment +
    "');";
});

module.exports = app;
