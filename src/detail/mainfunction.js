const mysqlConObj = require('../../config/mysql'); // #2
const { request } = require('express');
const db = mysqlConObj.init();

module.exports = {
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
        else req.userstat = '';
        next();
      }
    });
  },

};
