const express = require('express');
const app = express();
const router = express.Router();

app.post('/', function (req, res) {
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
        //회원가입 성공 + DB에 저장
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

module.exports = app;
