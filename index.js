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
const newidcheck = require('./src/auth/newidcheck');
const checkauthorization = require('./src/auth/checkauthorization');
const main = require('./src/main/main');

const newdress = require('./src/main/maincategory/new');
const best = require('./src/main/maincategory/best');
const outer = require('./src/main/maincategory/outer');
const pants = require('./src/main/maincategory/pants');
const shoesbags = require('./src/main/maincategory/shoesbags');
const skirt = require('./src/main/maincategory/skirt');
const top = require('./src/main/maincategory/top');

app.use(express.static(path.join(__dirname, 'src')));
app.use('/auth/login', login);
app.use('/auth/logout', logout);
app.use('/auth/newuser', newuser);
app.use('/auth/token', token);
app.use('/auth/newidcheck', newidcheck);

app.use('/main', main);

app.use('/main/new', newdress);
app.use('/main/best', best);
app.use('/main/outer', outer);
app.use('/main/pants', pants);
app.use('/main/shoesbags', shoesbags);
app.use('/main/skirt', skirt);
app.use('/main/top', top);

//const dotenv = require('dotenv').config(); // #1
const mysqlConObj = require('./config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

https: app.use(express.json());
app.use(cors());

dotenv.config();

// app.get('/main', checkauthorization.authenticateToken, (req, res) => {
//   //console.log(res);

//   const id = req.user.id;

//   const checkidsql =
//     "SELECT EXISTS (select * from users where id = '" + id + "') as isChk";
//   db.query(checkidsql, (err, result) => {
//     if (err) console.log(err);
//     else {
//       checkid = result[0].isChk;
//       if (checkid == 0) {
//         console.log('db 안에 아이디 없음');
//       } else {
//         res.send('로그인 성공');
//       }
//     }
//   });

//   res.send('굳');
//   // 첫번째 인자 req: 클라이언트에서 요청이올 때, ReqBody, ReqHeader, url 등등 그런 정보들이 모두 들어있다.
//   // 두번째 인자 res: 클라이언트에 응답할 때 필요한 모든 정보들이 들어있다. 지금부터 저희가 작성할 내용 외에도 기본적으로 들어가야되는 네트워크 정보라던지 그런 것들이 모두 여기 들어있다.
//   //res.send({ users: users });
// });

// app.post('/', function (req, res) {
//   //console.log(req.body);
//   users.push({ name: req.body.name, age: req.body.age });
//   return res.send({ sucess: true });
// });

app.listen(PORT, function () {
  console.log('server listening on port 3000');
});
