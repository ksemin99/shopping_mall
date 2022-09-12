const mysql = require('mysql'); // #1

const mysqlConnection = {
  init: function () {
    // #2
    return mysql.createConnection({
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    });
  },
  open: function (con) {
    // #3
    con.connect((err) => {
      if (err) {
        console.log('MySQL 연결 실패 : ', err);
      } else {
        console.log('MySQL Connected!!!');
      }
    });
  },
  close: function (con) {
    // #4
    con.end((err) => {
      if (err) {
        console.log('MySQL 종료 실패 : ', err);
      } else {
        console.log('MySQL Terminated...');
      }
    });
  },
};

module.exports = mysqlConnection;
