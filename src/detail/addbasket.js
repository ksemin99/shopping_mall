const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
document;

// const mysqlConObj = require('../../config/mysql'); // #2
// const { request } = require('express');
// const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', (req, res, next) => {
  let test = 'test';
  let test1 = 'test1';
  let getCookie = function (name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

    return value ? value[2] : null;
  };
  function setCookie(cName, cValue, cDay) {
    let expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if (typeof cDay != 'undefined')
      cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
  }
  setCookie(test, test1, 1);
  console.log(test);
});

module.exports = app;
