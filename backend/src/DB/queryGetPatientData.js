const mysqlConn = require('../DB/connectDB');

const queryGetPatientData = async (idPaciente) => {
  const conn = await mysqlConn.getConnection();

  try {
    let { idInfoClinica, idAntEpidemiologicos } = 0;

    const [pacientes, fieldsP] = await conn
      .execute(`SELECT * FROM pacientes WHERE id=${idPaciente}`)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log(err);
      });
    if (pacientes.length > 0) {
      idInfoClinica = pacientes[0].idInfoClinica;
      idAntEpidemiologicos = pacientes[0].idAntEpidemiologicos;
    } else {
      return {};
    }
    const [infoClinica, fieldsIC] = await conn
      .execute(`SELECT * FROM info_clinica_paciente WHERE id=${idInfoClinica}`)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log(err);
      });

    const [antEpidemio, fieldsAE] = await conn
      .execute(
        `SELECT * FROM ant_epidemiologicos WHERE id=${idAntEpidemiologicos}`
      )
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log(err);
      });

    const [contactos, fieldsC] = await conn
      .execute(
        `SELECT pc.id as idPc,pc.nombre,pc.apellido,pc.sexo,pc.tipoDoc,pc.nroDoc,pc.nacionalidad,pc.telefono,pc.calle,pc.nroCalle,pc.piso,pc.depto,pc.barrioVilla,pc.codPos,pc.provincia,pc.localidad,pc.tipoContacto,pc.ultimoContacto FROM ant_epidemiologicos_contacto as aec JOIN personas_contacto as pc ON aec.idPersonaContacto = pc.id WHERE idAntEpidemiologicos=${idAntEpidemiologicos}`
      )
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log(err);
      });

    const [signosSintomas, fieldsSs] = await conn
      .execute(
        `SELECT ss.id,ss.nombre,ss.descripcion FROM info_clinica_paciente_signos_sintomas as icpss JOIN signos_sintomas as ss ON icpss.idSignosSintomas = ss.id WHERE idInfoClinicaPaciente=${idInfoClinica}`
      )
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log(err);
      });

    const [comorbilidades, fieldsCo] = await conn
      .execute(
        `SELECT c.id,c.nombre,c.descripcion FROM info_clinica_pacientes_comorbilidades as icpc JOIN comorbilidades as c ON icpc.idComorbilidades = c.id WHERE idInfoClinicaPaciente=${idInfoClinica}`
      )
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      ...pacientes[0],
      infoClinica: {
        ...infoClinica[0],
        signosSintomas: [...signosSintomas],
        comorbilidades: [...comorbilidades],
      },
      antEpidemio: {
        ...antEpidemio[0],
        contactos: [...contactos],
      },
    };
  } catch (err) {
    console.log(err);
  } finally {
    conn.removeAllListeners();
    conn.release();
  }
};

module.exports = {
  queryGetPatientData,
};
