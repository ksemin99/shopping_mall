const jwt = require('jsonwebtoken');
module.exports = {
  authenticateToken: function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //accesstoken 받고 .env에 있는 토큰 암호값 계산해서 token에 맞는 사용자 정보 가져오기
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },

  generateAccessToken: function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
  },
};
