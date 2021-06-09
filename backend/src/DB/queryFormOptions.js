const mysqlConn = require('../DB/connectDB');

const queryFormOptionsProvincias = async () => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await mysqlConn
      .execute(`SELECT * FROM provincias`)
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

const queryFormOptionsLocalidades = async (provincia) => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await mysqlConn
      .execute(`SELECT * FROM localidades where idProvincia=${provincia}`)
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

module.exports = { queryFormOptionsProvincias, queryFormOptionsLocalidades };
