const mysqlConn = require('../DB/connectDB');
const queryAuth = async (userName) => {
  let queryResult = new Promise((res, rej) => {
    mysqlConn.execute(
      `SELECT * FROM usuarios WHERE userName='${userName}'`,
      (err, result, fields) => {
        if (err) rej(err);
        res({ result, fields });
      }
    );
  });

  return await queryResult;
};

module.exports = queryAuth;
