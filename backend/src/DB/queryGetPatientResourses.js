const mysqlConn = require('./connectDB');

const queryGetPatientResourses = async (idPaciente) => {
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
  queryGetPatientResourses,
  queryGetTiposRecurso,
  queryGetUbicaciones,
};
