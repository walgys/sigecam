const mysqlConn = require('./connectDB');
const { resultTypes } = require('../utils/index');
require('../utils/index');

const create = async (pacienteData) => {
  const conn = await mysqlConn.getConnection();
  let antEpidemioResult = [];
  let infoClinicaResult = [];
  let returnMessage = {};
  try {
    await conn.beginTransaction();

    const [rows, fields] = await conn.execute(
      'SELECT `id` from `pacientes` WHERE `nroDoc`=? AND sexo=?',
      [pacienteData.nroDoc, pacienteData.sexo]
    );
    if (rows.length > 0) {
      conn.rollback();
      returnMessage = {
        result: resultTypes.ERROR,
        message: 'Ya existe el paciente',
      };
    } else {
      if (pacienteData.aplica === '1') {
        try {
          const fechaFis = await new Date(pacienteData.fechaPrimeraConsulta)
            .toISOString()
            .split('T')[0];
          infoClinicaResult = await conn.execute(
            'INSERT INTO `info_clinica_paciente` (estadoInternacion, fechaFis, fechafechaPrimeraConsulta, semanaFis) VALUES (?,?,?,?)',
            [
              pacienteData.estadoInternacion,
              new Date(pacienteData.fechaFis).toISOString().split('T')[0],
              fechaFis,
              pacienteData.semanaFis,
            ]
          );
        } catch (err) {
          console.log(err);
        }

        pacienteData.signosSintomas.forEach(async (element) => {
          try {
            await conn.execute(
              'INSERT INTO `info_clinica_paciente_signos_sintomas` (idInfoClinicaPaciente,idSignosSintomas) VALUES (?,?)',
              [infoClinicaResult[0].insertId, element.id]
            );
          } catch (err) {
            console.log(err);
          }
        });

        pacienteData.comorbilidades.forEach(async (element) => {
          try {
            await conn.execute(
              'INSERT INTO `info_clinica_pacientes_comorbilidades` (idInfoClinicaPaciente,idComorbilidades) VALUES (?,?)',
              [infoClinicaResult[0].insertId, element.id]
            );
          } catch (err) {
            console.log(err);
          }
        });
      }

      if (pacienteData.trabajadorSalud === '1') {
        try {
          const fecVacGripal = await new Date(pacienteData.fecVacGripal)
            .toISOString()
            .split('T')[0];
          antEpidemioResult = await conn.execute(
            'INSERT INTO `ant_epidemiologicos` (fueraPais, dentroPais, atencionEnCentro, antVacGripal, fecVacGripal, contactoCasos, nomApeCaso, idCaso, trabajoSalud, contagioColega, nexoDesconocido, transComunitaria, asistInfectado, congloCasos, nombreDireccionInstitucion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
              pacienteData.fueraPais,
              pacienteData.dentroPais,
              pacienteData.atencionEnCentro,
              pacienteData.antVacGripal,
              fecVacGripal,
              pacienteData.contactoCasos,
              pacienteData.nomApeCaso,
              pacienteData.idCaso,
              pacienteData.trabajoSalud,
              pacienteData.contagioColega,
              pacienteData.nexoDesconocido,
              pacienteData.transComunitaria,
              pacienteData.asistInfectado,
              pacienteData.congloCasos,
              pacienteData.nombreDireccionInstitucion,
            ]
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const fecVacGripal = await new Date(pacienteData.fecVacGripal)
            .toISOString()
            .split('T')[0];
          antEpidemioResult = await conn.execute(
            'INSERT INTO `ant_epidemiologicos` (fueraPais, dentroPais, atencionEnCentro, antVacGripal, fecVacGripal, contactoCasos, nomApeCaso, idCaso, trabajoSalud) VALUES (?,?,?,?,?,?,?,?,?)',
            [
              pacienteData.fueraPais,
              pacienteData.dentroPais,
              pacienteData.atencionEnCentro,
              pacienteData.antVacGripal,
              fecVacGripal,
              pacienteData.contactoCasos,
              pacienteData.nomApeCaso,
              pacienteData.idCaso,
              pacienteData.trabajoSalud,
            ]
          );
        } catch (err) {
          console.log(err);
        }
      }

      pacienteData.contactos.forEach(async (element) => {
        try {
          const ultimoContacto = await new Date(element.ultimoContacto)
            .toISOString()
            .split('T')[0];
          const contactoResult = await conn.execute(
            'INSERT INTO `personas_contacto` (nombre, apellido, sexo, tipoDoc, nroDoc, telefono, nacionalidad, provincia, localidad, calle, nroCalle, depto, barrioVilla, codPos, tipoContacto, ultimoContacto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
              element.nombre,
              element.apellido,
              element.sexo,
              element.tipoDoc,
              element.nroDoc,
              element.telefono,
              element.nacionalidad,
              element.provincia,
              element.localidad,
              element.calle,
              element.nroCalle,
              element.depto,
              element.barrioVilla,
              element.codPos,
              element.tipoContacto,
              ultimoContacto,
            ]
          );
          await conn.execute(
            'INSERT INTO `ant_epidemiologicos_contacto` (idAntEpidemiologicos, idPersonaContacto) VALUES (?,?)',
            [antEpidemioResult[0].insertId, contactoResult[0].insertId]
          );
        } catch (err) {
          console.log(err);
        }
      });
      try {
        await conn.execute(
          'INSERT INTO `pacientes` (idInstitucion, nombre, apellido, sexo, edad, tipoDoc, nroDoc, nacionalidad, telefono, provincia, localidad, calle, nroCalle, piso, depto, codPos, barrioVilla, privadoLibertad, idInfoClinica, idAntEpidemiologicos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            pacienteData.institucion,
            pacienteData.nombre,
            pacienteData.apellido,
            pacienteData.sexo,
            pacienteData.edad,
            pacienteData.tipoDoc,
            pacienteData.nroDoc,
            pacienteData.nacionalidad,
            pacienteData.telefono,
            pacienteData.provincia,
            pacienteData.localidad,
            pacienteData.calle,
            pacienteData.nroCalle,
            pacienteData.piso,
            pacienteData.depto,
            pacienteData.codPos,
            pacienteData.barrioVilla,
            pacienteData.privadoLibertad,
            pacienteData.aplica ? infoClinicaResult[0].insertId : null,
            antEpidemioResult[0].insertId,
          ]
        );
      } catch (err) {
        console.log(err);
      }
      try {
        await conn.commit();
        returnMessage = {
          result: resultTypes.OK,
          messsage: null,
        };
      } catch (err) {
        console.log(err);
      }
    }

    console.log('done commit');
  } catch (err) {
    try {
      await conn.rollback();
      returnMessage = {
        result: resultTypes.ERROR,
        messsage: 'Error al procesar Query',
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

module.exports = { create };
