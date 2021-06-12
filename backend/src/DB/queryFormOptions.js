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

const queryFormOptionsSexo = async () => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await mysqlConn
      .execute(`SELECT * FROM sexo`)
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

const queryFormOptionsTipoDoc = async () => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await mysqlConn
      .execute(`SELECT * FROM tipo_documento`)
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

const queryFormOptionsNacionalidades = async () => {
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

const queryFormOptionsLocalidades = async () => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await mysqlConn
      .execute(`SELECT * FROM localidades`)
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
  queryFormOptionsProvincias,
  queryFormOptionsLocalidades,
  queryFormOptionsNacionalidades,
  queryFormOptionsSexo,
  queryFormOptionsTipoDoc,
};
