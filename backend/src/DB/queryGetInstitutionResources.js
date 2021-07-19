const mysqlConn = require('./connectDB');

const queryGetInstitucionResources = async (idInstitucion) => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await conn
      .execute(
        `SELECT r.id, r.tipo, r.nombre, r.descripcion, r.ubicacion FROM recursos_instituciones as ri JOIN recursos as r ON r.id=ri.idRecurso WHERE ri.idInstitucion=${idInstitucion} AND ri.asignado=0`
      )
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
  queryGetInstitucionResources,
};
