const mysqlConn = require('./connectDB');
const { resultTypes } = require('../utils/index');
require('../utils/index');
const queryGetPatientData = require('./queryGetPatientData');

const updatePatientData = async (pacienteData) => {
  const conn = await mysqlConn.getConnection();
  let antEpidemioResult = [];
  let infoClinicaResult = [];
  let returnMessage = {};
  try {
    await conn.beginTransaction();

    const paciente = await queryGetPatientData.queryGetPatientData(
      pacienteData.id
    );
    if (paciente.id == pacienteData.id) {
      if (pacienteData.aplica === '1') {
        try {
          const fechaFis = await new Date(pacienteData.fechaPrimeraConsulta)
            .toISOString()
            .split('T')[0];
          infoClinicaResult = await conn.execute(
            'UPDATE `info_clinica_paciente` SET estadoInternacion=?, fechaFis=?, fechaPrimeraConsulta=?, semanaFis=? WHERE id=?',
            [
              pacienteData.estadoInternacion,
              new Date(pacienteData.fechaFis).toISOString().split('T')[0],
              fechaFis,
              pacienteData.semanaFis,
              pacienteData.idInfoClinica,
            ]
          );
        } catch (err) {
          console.log(err);
        }
        //Eliminar signos sintomas que ya no son parte del estado del paciente
        const signosSintomasToDelete =
          paciente.infoClinica.signosSintomas.filter(
            (ssd) =>
              pacienteData.signosSintomas.filter((ss) => ss.id == ssd.id)
                .length == 0
          );

        signosSintomasToDelete.forEach(async (ssd) => {
          try {
            const result = await conn.execute(
              'DELETE FROM info_clinica_paciente_signos_sintomas WHERE idSignosSintomas=? AND idInfoClinicaPaciente=?',
              [ssd.id, pacienteData.idInfoClinica]
            );
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        });
        //actualizar los nuevos signos sintomas
        pacienteData.signosSintomas.forEach(async (element) => {
          try {
            const result = await conn.execute(
              'INSERT IGNORE INTO `info_clinica_paciente_signos_sintomas` (idInfoClinicaPaciente,idSignosSintomas) VALUES (?,?)',
              [pacienteData.idInfoClinica, element.id]
            );
          } catch (err) {
            console.log(err);
          }
        });
        //eliminar las comorbilidades que ya no son parte del estado del paciente
        const comorbilidadesToDelete =
          paciente.infoClinica.comorbilidades.filter(
            (ssd) =>
              pacienteData.comorbilidades.filter((ss) => ss.id == ssd.id)
                .length == 0
          );

        comorbilidadesToDelete.forEach(async (ssd) => {
          try {
            const result = await conn.execute(
              'DELETE FROM info_clinica_pacientes_comorbilidades WHERE idComorbilidades=? AND idInfoClinicaPaciente=?',
              [ssd.id, pacienteData.idInfoClinica]
            );
          } catch (err) {
            console.log(err);
          }
        });
        //actualizar las comorbilidades
        pacienteData.comorbilidades.forEach(async (element) => {
          try {
            const result = await conn.execute(
              'INSERT IGNORE INTO `info_clinica_pacientes_comorbilidades` (idInfoClinicaPaciente,idComorbilidades) VALUES (?,?)',
              [pacienteData.idInfoClinica, element.id]
            );
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        });
      }
      //actualizar antecedentes Epidemiologicos
      if (pacienteData.trabajoSalud === '1') {
        try {
          const fecVacGripal = await new Date(pacienteData.fecVacGripal)
            .toISOString()
            .split('T')[0];
          antEpidemioResult = await conn.execute(
            'UPDATE `ant_epidemiologicos` SET fueraPais=?, dentroPais=?, atencionEnCentro=?, antVacGripal=?, fecVacGripal=?, contactoCasos=?, nomApeCaso=?, idCaso=?, trabajoSalud=?, contagioColega=?, nexoDesconocido=?, transComunitaria=?, asistInfectado=?, congloCasos=?, nombreDireccionInstitucion=? WHERE id=?',
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
              pacienteData.idAntEpidemiologicos,
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
            'UPDATE `ant_epidemiologicos` SET fueraPais=?, dentroPais=?, atencionEnCentro=?, antVacGripal=?, fecVacGripal=?, contactoCasos=?, nomApeCaso=?, idCaso=?, trabajoSalud=? WHERE id=?',
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
              pacienteData.idAntEpidemiologicos,
            ]
          );
        } catch (err) {
          console.log(err);
        }
      }
      //eliminar contactos que ya no forman parte del estado del paciente
      const contactosToDelete = paciente.antEpidemio.contactos.filter(
        (contd) => {
          return (
            pacienteData.contactos.filter((pdc) => {
              if (typeof pdc.idPc == 'undefined') {
                return true;
              } else {
                console.log(pdc.idPc == contd.idPc);
                return pdc.idPc == contd.idPc;
              }
            }).length == 0
          );
        }
      );
      //quede aca
      contactosToDelete.forEach(async (pdc) => {
        try {
          await conn.execute(
            'DELETE FROM ant_epidemiologicos_contacto WHERE idAntEpidemiologicos=? AND idPersonaContacto=?',
            [pacienteData.idAntEpidemiologicos, pdc.idPc]
          );
          await conn.execute('DELETE FROM personas_contacto WHERE id=?', [
            pdc.idPc,
          ]);
        } catch (err) {
          console.log(err);
        }
      });
      //crear o actualizar contactos del paciente
      pacienteData.contactos.forEach(async (contacto) => {
        try {
          if (contacto.idPc) {
            const ultimoContacto = await new Date(contacto.ultimoContacto)
              .toISOString()
              .split('T')[0];
            const contactoResult = await conn.execute(
              'UPDATE `personas_contacto`  SET nombre=?, apellido=?, sexo=?, tipoDoc=?, nroDoc=?, telefono=?, nacionalidad=?, provincia=?, localidad=?, calle=?, nroCalle=?, depto=?, barrioVilla=?, codPos=?, tipoContacto=?, ultimoContacto=? WHERE id=?',
              [
                contacto.nombre,
                contacto.apellido,
                contacto.sexo,
                contacto.tipoDoc,
                contacto.nroDoc,
                contacto.telefono,
                contacto.nacionalidad,
                contacto.provincia,
                contacto.localidad,
                contacto.calle,
                contacto.nroCalle,
                contacto.depto,
                contacto.barrioVilla,
                contacto.codPos,
                contacto.tipoContacto,
                ultimoContacto,
                contacto.idPc,
              ]
            );

            const result = await conn.execute(
              'INSERT IGNORE INTO `ant_epidemiologicos_contacto` (idAntEpidemiologicos, idPersonaContacto) VALUES (?,?)',
              [pacienteData.idAntEpidemiologicos, contacto.idPc]
            );
          } else {
            const ultimoContacto = await new Date(contacto.ultimoContacto)
              .toISOString()
              .split('T')[0];
            const contactoResult = await conn.execute(
              'INSERT INTO `personas_contacto` (nombre, apellido, sexo, tipoDoc, nroDoc, telefono, nacionalidad, provincia, localidad, calle, nroCalle, depto, barrioVilla, codPos, tipoContacto, ultimoContacto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              [
                contacto.nombre,
                contacto.apellido,
                contacto.sexo,
                contacto.tipoDoc,
                contacto.nroDoc,
                contacto.telefono,
                contacto.nacionalidad,
                contacto.provincia,
                contacto.localidad,
                contacto.calle,
                contacto.nroCalle,
                contacto.depto,
                contacto.barrioVilla,
                contacto.codPos,
                contacto.tipoContacto,
                ultimoContacto,
              ]
            );
            //insertar relacion de contactos nuevos
            const result = await conn.execute(
              'INSERT INTO `ant_epidemiologicos_contacto` (idAntEpidemiologicos, idPersonaContacto) VALUES (?,?)',
              [pacienteData.idAntEpidemiologicos, contactoResult[0].insertId]
            );
          }
        } catch (err) {
          console.log(err);
        }
      });

      //actualizar datos base del paciente
      try {
        const resultPaciente = await conn.execute(
          'UPDATE `pacientes` SET idInstitucion=?, nombre=?, apellido=?, sexo=?, edad=?, tipoDoc=?, nroDoc=?, nacionalidad=?, telefono=?, provincia=?, localidad=?, calle=?, nroCalle=?, piso=?, depto=?, codPos=?, barrioVilla=?, privadoLibertad=?, idInfoClinica=?, idAntEpidemiologicos=? WHERE id=?',
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
            pacienteData.aplica ? pacienteData.idInfoClinica : null,
            pacienteData.idAntEpidemiologicos,
            pacienteData.id,
          ]
        );
      } catch (err) {
        console.log(err);
      }
      try {
        await conn.commit();
        returnMessage = {
          result: resultTypes.SUCCESS,
          messsage: null,
        };
      } catch (err) {
        console.log(err);
      }
    } else {
      conn.rollback();
      returnMessage = {
        result: resultTypes.ERROR,
        message: 'No existe el paciente',
      };
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

module.exports = { updatePatientData };
