const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  authenticateToken: function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.send('로그인을 하지 않은 상태입니다.');
    //return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //accesstoken 받고 .env에 있는 토큰 암호값 계산해서 token에 맞는 사용자 정보 가져오기
      if (err) return res.send('토큰이 만료되었습니다.');
      else req.user = user;
      next();
    });
  },

  generateAccessToken: function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
  },

  checkAccessTokenExpiresIn: function checkAccessTokenExpiresIn(accessToken) {
    // accessToken 생명주기 가져오기
    let result = 0;
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      result = user.exp - user.iat;
    });
    return result;
  },

  checkRefreshTokenExpiresIn: function checkRefreshTokenExpiresIn(
    // refreshToken 생명주기 가져오기
    refreshToken
  ) {
    let result = 0;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      result = user.exp - user.iat;
    });
    return result;
  },
};
