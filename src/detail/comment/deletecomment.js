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

app.delete(
  '/:index',
  checkauthorization.authenticateToken,
  (req, res, next) => {
    const index = req.params.index;
    deletesql = 'DELETE FROM comment WHERE index = ' + index;
    db.query(deletesql, (err, deleteresult) => {
      if (err) console.log(err);
      else {
        console.log('삭제성공');
      }
    });
  }
);

module.exports = app;
