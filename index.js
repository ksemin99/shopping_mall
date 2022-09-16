const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const PORT = 3000;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

//const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const db = mysqlConObj.init();

https: app.use(express.json());
app.use(cors());

dotenv.config();

// 이 아래 부분이 DB로 받는것들
const users = [
  {
    id: 'Park',
    pw: 'pw1',
  },
  {
    id: 'Kim',
    pw: 'pw2',
  },
];

app.post('/login', (req, res, next) => {
  const { id, pw } = req.body;

  const user = {
    id: id,
    pw: pw,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/user', authenticateToken, (req, res) => {
  res.json(
    users.filter((user) => user.id === req.user.id && user.pw === req.user.pw)
  );
  // 첫번째 인자 req: 클라이언트에서 요청이올 때, ReqBody, ReqHeader, url 등등 그런 정보들이 모두 들어있다.
  // 두번째 인자 res: 클라이언트에 응답할 때 필요한 모든 정보들이 들어있다. 지금부터 저희가 작성할 내용 외에도 기본적으로 들어가야되는 네트워크 정보라던지 그런 것들이 모두 여기 들어있다.
  //res.send({ users: users });
});

app.post('/user', function (req, res) {
  console.log(req.body);
  users.push({ name: req.body.name, age: req.body.age });
  return res.send({ sucess: true });
});

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});

app.post('/newuser', function (req, res) {
  const id = req.body.id;
  const pw = req.body.pw;
  const pwchk = req.body.pwchk;
  const { name, sex } = req.body;
  if (id.replace(/(\s*)/g, '').length >= 4) {
    // DB에서 id 중복확인
    if (
      pw.replace(/(\s*)/g, '').length >= 8 &&
      pw.replace(/(\s*)/g, '').length <= 20
    ) {
      if (pw === pwchk) {
        res.send('굳');
        sql =
          "insert into users(id, pwd, name, sex) values ('" +
          id +
          "','" +
          pw +
          "','" +
          name +
          "','" +
          sex +
          "');";

        db.query(sql, (err, result) => {
          if (err) console.log(err);
          else console.log(result);
        });
      } else {
        res.send('꺼져');
      }
    } else {
      res.send('꺼져');
    }
  } else {
    res.send('꺼져');
  }
});
