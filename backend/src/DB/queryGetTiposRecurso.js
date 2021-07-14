const mysqlConn = require('./connectDB');

const queryGetTiposRecurso = async () => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await conn
      .execute(`SELECT * FROM tipo_recurso`)
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

module.exports = {
  queryGetTiposRecurso,
};
