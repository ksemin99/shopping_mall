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
  b_num = req.body.b_num;
  u_num = req.body.u_num;
  delete_commnet_sql =
    "delete from comment where b_num ='" +
    b_num +
    "' and u_num ='" +
    u_num +
    "';";
});
