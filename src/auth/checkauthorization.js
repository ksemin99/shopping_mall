const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  authenticateToken: function authenticateToken(req, res, next) {
    //로그아웃시 access토큰 받기
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.send('로그인을 하지 않은 상태입니다.');
    //return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //accesstoken 받고 .env에 있는 토큰 암호값 계산해서 token에 맞는 사용자 정보 가져오기
      if (err)
        res.send(
          'AccessToken이 만료되었거나 틀린 AccessToken /auth/token 으로 RefreshToken 요함'
        );
      else req.user = user;
      next();
    });
  },

  generateAccessToken: function generateAccessToken(user) {
    // accesstoken 생성
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s',
    });
  },

  generateRefreshToken: function generateRefreshToken(user) {
    // refreshtoken 생성
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
  },

  checkAccessTokenExpiresIn: function checkAccessTokenExpiresIn(accessToken) {
    // accessToken 생명주기 가져오기
    let result
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      result = user.exp * 1000
    });
    return result;
  },

  checkRefreshTokenExpiresIn: function checkRefreshTokenExpiresIn(
    // refreshToken 생명주기 가져오기
    refreshToken
  ) {
    let result
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      result = user.exp * 1000
    });
    return result;
  },

  // // accesstoken 받고 유효한지 확인 로그인 유무 상관없이
  // checkAccessToken: function checkAccessToken(req, res, next) { //access토큰 받기
  //   const authHeader = req.headers['authorization'];
  //   const token = authHeader && authHeader.split(' ')[1];
  //   if (token == null) return console.log('로그인을 하지 않은 상태입니다.');
  //   //return res.sendStatus(401);

  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     //accesstoken 받고 .env에 있는 토큰 암호값 계산해서 token에 맞는 사용자 정보 가져오기
  //     if (err) return res.send('토큰이 만료되었습니다.'); // 이 때 재발급 refreshtoken 요청
  //     else req.user = user; // ? 이거 뭐야
  //     next();
  //   });
  // },
};
