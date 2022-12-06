const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();
const cookieParser = require('cookie-parser');

const checkauthorization = require('../auth/checkauthorization');

app.use(cookieParser('secretKey'));

app.use(cors());

dotenv.config();

app.post('/', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.body.id;
  console.log('ID = ' + id);
  profilesql =
    'SELECT id, name, sex, height, weight FROM users WHERE id = "' + id + '"';
  db.query(profilesql, (err, profileresult) => {
    if (err) console.log(err);
    else {
      res.send(profileresult);
    }
  });
});

module.exports = app;
