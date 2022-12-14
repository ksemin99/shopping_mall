const mysql = require('mysql'); // #1

const mysqlConnection = {
  init: function () {
    // #2
    console.log('mysql 성공');
    return mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '1234',
      database: 'shopping_db',
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
