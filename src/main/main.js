const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const checkauthorization = require('../auth/checkauthorization');

const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

app.get('/', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.user.id;

  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        res.send('메인 페이지 연결 완료');
      }
    }
  });
});

app.get('/new', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.user.id;

  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        res.send('new 연결 완료');
      }
    }
  });
});
app.get('/best', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.user.id;

  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        res.send('best 연결 완료');
      }
    }
  });
});
app.get('/top', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.user.id;

  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        res.send('top 연결 완료');
      }
    }
  });
});
app.get('/pants', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.user.id;

  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        res.send('pants 연결 완료');
      }
    }
  });
});
app.get('/outer', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.user.id;

  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        res.send('outer 연결 완료');
      }
    }
  });
});
app.get('/skirt', checkauthorization.authenticateToken, (req, res, next) => {
  const id = req.user.id;

  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) {
        console.log('db 안에 아이디 없음');
      } else {
        res.send('skirt 연결 완료');
      }
    }
  });
});
app.get(
  '/shoesbags',
  checkauthorization.authenticateToken,
  checkjwtid,
  (req, res, next) => {
    const userstat = req.userstat.stat;

    console.log(id);
    console.log(userstat);

    res.send(userstat);
  }
);

checkjwtid: function checkjwtid(req, res, next) {
  console.log(req.user);
  const id = req.user.id;
  const checkidsql =
    "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
  db.query(checkidsql, (err, result) => {
    if (err) console.log(err);
    else {
      checkid = result[0].isChk;
      if (checkid == 0) req.userstat = 'db안에 아이디 없음';
      else req.userstat = 'shoes&bags 연결 완료';
      next();
    }
  });
}

module.exports = app;
