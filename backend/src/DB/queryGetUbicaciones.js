const mysqlConn = require('./connectDB');

const queryGetUbicaciones = async (idPaciente) => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await conn
      .execute(
        `SELECT u.id, p.idInstitucion, u.nombre, u.descripcion FROM pacientes as p JOIN ubicaciones_institucion as u ON u.idInstitucion=p.idInstitucion WHERE p.id=${idPaciente}`
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
  queryGetUbicaciones,
};
