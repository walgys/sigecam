const mysqlConn = require('./connectDB');

const queryGetPatientResources = async (idPaciente) => {
  const conn = await mysqlConn.getConnection();
  try {
    const [rows, fields] = await conn
      .execute(
        `SELECT r.id, r.nombre, r.descripcion, r.tipo, r.ubicacion, idRecurso FROM recursos_pacientes JOIN recursos as r ON r.id=idRecurso WHERE idPaciente=${idPaciente}`
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
  queryGetPatientResources,
};
