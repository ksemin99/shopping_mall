const mysql = require('mysql'); // #1

const mysqlConnection = {
  init: function () {
    // #2
    return mysql.createConnection({
      host: '35.89.73.172',
      port: '33060',
      user: 'shop',
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
