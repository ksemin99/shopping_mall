const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const PORT = 3000;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const login = require('./src/auth/login');
const logout = require('./src/auth/logout');
const newuser = require('./src/auth/newuser');
const token = require('./src/auth/token');

app.use(express.static(path.join(__dirname, 'src')));
app.use('/auth/login', login);
app.use('/auth/logout', logout);
app.use('/auth/newuser', newuser);
app.use('/auth/token', token);

//const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const { request } = require('express');
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //accesstoken 받고 .env에 있는 토큰 암호값 계산해서 token에 맞는 사용자 정보 가져오기
    if (err) return res.sendStatus(403);
    console.log(token);
    console.log(process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  });
}

app.get('/main', authenticateToken, (req, res) => {
  res.json(
    users.filter((user) => user.id === req.user.id && user.pw === req.user.pw)
  );
  // 첫번째 인자 req: 클라이언트에서 요청이올 때, ReqBody, ReqHeader, url 등등 그런 정보들이 모두 들어있다.
  // 두번째 인자 res: 클라이언트에 응답할 때 필요한 모든 정보들이 들어있다. 지금부터 저희가 작성할 내용 외에도 기본적으로 들어가야되는 네트워크 정보라던지 그런 것들이 모두 여기 들어있다.
  //res.send({ users: users });
});

app.post('/main', function (req, res) {
  //console.log(req.body);
  users.push({ name: req.body.name, age: req.body.age });
  return res.send({ sucess: true });
});

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
