const mysqlConn = require('../DB/connectDB');
const queryAuth = async (userName) => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await mysqlConn
      .execute(`SELECT * FROM usuarios WHERE userName='${userName}'`)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log(err);
      });

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    conn.removeAllListeners();
    conn.release();
  }
};

module.exports = queryAuth;
