const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
  console.log(req);
  b_num = req.body.b_num;
  u_num = req.body.u_num;
  id = req.body.id;
  u_img = req.body.u_img;
  comment = req.body.comment;
  c_img = req.body.c_img;
  comment_sql =
    "insert into comment(b_num, u_num, id, u_img, comment, c_img) values('" +
    b_num +
    "','" +
    u_num +
    "','" +
    id +
    "','" +
    comment +
    "');";
});
