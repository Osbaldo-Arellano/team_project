const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_arellano',
  password        : '2809',
  database        : 'cs340_arellano',
});

const getConnection = function (cb) {
  pool.getConnection(function (err, connection) {
      //if(err) throw err;
      //pass the error to the cb instead of throwing it
      if(err) {
        return cb(err);
      }
      cb(null, connection);
  });
};

module.exports = getConnection;
