const express = require('express');
const app = express();

//const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const db = mysqlConObj.init();

mysqlConObj.open(db);

https: app.use(express.json());

const users = [];

app.get('/user', function (req, res) {
  // 첫번째 인자 req: 클라이언트에서 요청이올 때, ReqBody, ReqHeader, url 등등 그런 정보들이 모두 들어있다.
  // 두번째 인자 res: 클라이언트에 응답할 때 필요한 모든 정보들이 들어있다. 지금부터 저희가 작성할 내용 외에도 기본적으로 들어가야되는 네트워크 정보라던지 그런 것들이 모두 여기 들어있다.
  res.send({ users: users });
});

app.post('/user', function (req, res) {
  console.log(req.body);
  users.push({ name: req.body.name, age: req.body.age });
  return res.send({ sucess: true });
});

app.listen(3000, function () {
  console.log('server listening on port 3000');
});
