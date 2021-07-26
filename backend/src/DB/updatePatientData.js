const mysqlConn = require('./connectDB');
const { resultTypes } = require('../utils/index');

const updatePatientData = async (paciente) => {
  return {
    result: resultTypes.SUCCESS,
    message: null,
  };
  const conn = await mysqlConn.getConnection();
  const { idPaciente, idInstitucion, recursos } = paciente;
  let returnMessage = {};
  try {
    await conn.beginTransaction();
    const [actualData, fields] = await conn.execute(
      `SELECT r.id, r.nombre, r.descripcion, r.tipo, r.ubicacion, idRecurso FROM recursos_pacientes JOIN recursos as r ON r.id=idRecurso WHERE idPaciente=${idPaciente}`
    );

    // Devolver recursos a la institución y quitarlos del paciente
    const DataToReturn = actualData.filter(
      (ar) => recursos.filter((r) => r.idRecurso == ar.id).length == 0
    );

    console.log('recursos a devolver: ' + JSON.stringify(DataToReturn));

    DataToReturn.forEach(async (r) => {
      await conn.execute(
        `UPDATE recursos_instituciones SET asignado=0 WHERE idRecurso=${r.id}`
      );
      await conn.execute(
        `DELETE FROM recursos_pacientes WHERE idRecurso=${r.id}`
      );
    });

    //asignar los recursos al paciente
    recursos.forEach(async (r) => {
      await conn.execute(
        'INSERT IGNORE INTO `recursos_pacientes` (idPaciente, idRecurso) VALUES (?,?)',
        [idPaciente, r.id]
      );
      await conn.execute(
        `UPDATE recursos_instituciones SET asignado=1 WHERE idRecurso=${r.id}`
      );
    });

    try {
      await conn.commit();
      returnMessage = {
        result: resultTypes.OK,
        message: null,
      };
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    try {
      await conn.rollback();
      returnMessage = {
        result: resultTypes.ERROR,
        message: 'Error al procesar Query',
      };
    } catch (err) {
      console.log(err);
    }
    console.log(err);
  } finally {
    conn.removeAllListeners();
    conn.release();
    return returnMessage;
  }
};

module.exports = {
  updatePatientData,
};
