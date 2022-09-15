const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());

let refreshTokens = [];
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

//
app.get('/user', authenticateToken, (req, res) => {
  res.json(
    users.filter((user) => user.id === req.user.id && user.pw === req.user.pw)
  );
});

app.post('/login', (req, res, next) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const user = {
    id: id,
    pw: pw,
  };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  //res.sendStatus(204);
  res.send('로그아웃 확인');
  //로그아웃과 동시에 DB에서 토큰 삭제
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ id: user.id, pw: user.pw });
    res.json({ accessToken: accessToken });
  });
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

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

app.listen(4000);
