const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const checkauthorization = require('../../auth/checkauthorization');

const mysqlConObj = require('../../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage })

app.post('/', checkauthorization.authenticateToken, upload.single('img'), (req, res, next) => {
  console.log(req.file);
  const b_num = Number(req.body.b_num);
  const u_num = Number(req.body.u_num);
  const id = Number(req.body.id);
  const comment = Number(req.body.comment);
  const img = `img/${req.file.filename}`;

  comment_sql =
    "insert into comment(b_num, u_num, id, comment, c_img) values('" +
    b_num +
    "','" +
    u_num +
    "','" +
    id +
    "','" +
    comment +
    "','" +
    img +
    "');";
  db.query(comment_sql, (err, comment_sqlresult) => {
    if (err) console.log(err);
    else {

    }
  });
});

module.exports = app;
