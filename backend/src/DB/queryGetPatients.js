const mysqlConn = require('../DB/connectDB');

const queryGetPatients = async (idInstitucion = null) => {
  const conn = await mysqlConn.getConnection();
  try {
    let sql = '';
    if (idInstitucion === null) {
      sql = `SELECT * FROM pacientes ORDER BY nombre ASC`;
    } else {
      sql = `SELECT * FROM pacientes where idInstitucion=${idInstitucion} ORDER BY nombre ASC`;
    }
    const [rows, fields] = await conn
      .execute(sql)
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

module.exports = { queryGetPatients };
