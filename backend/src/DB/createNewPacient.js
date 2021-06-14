const mysqlConn = require('../DB/connectDB');

const createNewPacient = async () => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await mysqlConn
      .execute(`SELECT * FROM nacionalidades ORDER BY nombre ASC`)
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
