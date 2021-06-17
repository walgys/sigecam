const mysqlConn = require('../DB/connectDB');
const { resultTypes } = require('../utils/index');
require('../utils/index');
const createNewPacient = async (pacienteData) => {
  const conn = await mysqlConn.getConnection();
  try {
    await conn.beginTransaction();
    const [rows, fields] = await conn.execute(
      'SELECT `id` from `pacientes` WHERE `nroDoc`=? AND sexo=?',
      [pacienteData.nroDoc, pacienteData.sexo]
    );
    if (rows.length > 0) {
      console.log('Ya existe el paciente');
      conn.rollback();
      return { result: resultTypes.ERROR, messsage: 'Ya existe el paciente' };
    } else {
      
      const antEpidemioResult;
      const infoClinicaResult;
      
      if(pacienteData.aplica === '1'){

       infoClinicaResult =  await conn.execute(
        'INSERT INTO `info_clinica_paciente` (estadoInternacion, fechaFis, fechaPrimeraConsulta, semanaFis) VALUES (?,?,?,?)',
        [
          pacienteData.estadoInternacion,
          pacienteData.fechaFis,
          pacienteData.primeraConsulta,
          pacienteData.semanaFis,
        ]
      );

      pacienteData.signosSintomas.forEach((element) => {
        await conn.execute('INSERT INTO `info_clinica_paciente_signos_sintomas` (idInfoClinicaPaciente,idSignosSintomas) VALUES (?,?)', [infoClinicaResult[0].insertId,element.id]);
      });

      pacienteData.comorbilidades.forEach((element) => {
        await conn.execute('INSERT INTO `info_clinica_paciente_comorbilidades` (idInfoClinicaPaciente,idSignosSintomas) VALUES (?,?)', [infoClinicaResult[0].insertId,element.id]);
      });
      }

      if(pacienteData.trabajadorSalud === '1'){
        antEpidemioResult = await conn.execute(
        'INSERT INTO `ant_epidemiologicos` (fueraPais, dentroPais, atencionEnCentro, antVacGripal, fecVacGripal, contactoCasos, nomApeCaso, idCaso, trabajoSalud, contagioColega, nexoDesconocido, transComunitaria, asistInfectado, congloCasos, nombreDireccionInstitucion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          pacienteData.viajoRiesgoFueraPais,
          pacienteData.viajoRiesgoDentroPais,
          pacienteData.atencionSaludCovid,
          pacienteData.vacunacionGripal,
          pacienteData.fechaVacunaGripal,
          pacienteData.contactoEstrechoCovid,
          pacienteData.contactoEstrechoCovidNombre,
          pacienteData.idDniSnvs,
          pacienteData.trabajadorSalud,
          pacienteData.trabajadorSaludColegaInfectado,
          pacienteData.trabajadorSaludDesconoceNexo,
          pacienteData.posibleTransmisionComunitaria,
          pacienteData.asistioCasosConfirmados,
          pacienteData.congloInstitucional,
          nombreDireccionInstitucion
        ]
      );
      }else{
        antEpidemioResult = await conn.execute(
          'INSERT INTO `ant_epidemiologicos` (fueraPais, dentroPais, atencionEnCentro, antVacGripal, fecVacGripal, contactoCasos, nomApeCaso, idCaso, trabajoSalud) VALUES (?,?,?,?,?,?,?,?,?)',
          [
            pacienteData.viajoRiesgoFueraPais,
            pacienteData.viajoRiesgoDentroPais,
            pacienteData.atencionSaludCovid,
            pacienteData.vacunacionGripal,
            pacienteData.fechaVacunaGripal,
            pacienteData.contactoEstrechoCovid,
            pacienteData.contactoEstrechoCovidNombre,
            pacienteData.idDniSnvs,
            pacienteData.trabajadorSalud,
          ]
        );
      }
      
      pacienteData.contactos.forEach(element=>{
         const contactoResult = await conn.execute(
        'INSERT INTO `personas_contacto` (nombre, apellido, sexo, tipoDoc, nroDoc, telefono, provincia, localidad, calle, nroCalle, depto, barrioVilla, codPos, tipoContacto, ultimoContacto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          pacienteData.nombre,
          pacienteData.apellido,
          pacienteData.sexo,
          pacienteData.tipoDoc,
          pacienteData.nroDoc,
          pacienteData.telefono,
          pacienteData.nacionalidad,
          pacienteData.provincia,
          pacienteData.localidad,
          pacienteData.domicilio,
          pacienteData.nroDom,
          pacienteData.depto,
          pacienteData.barrioVilla,
          pacienteData.domCP,
          pacienteData.tipoContacto,
          pacienteData.fechaUltimoContacto
        ]
      );
      await conn.execute(
        'INSERT INTO `ant_epidemiologicos_contacto` (idAntEpidemiologicos, idPersonaContacto) VALUES (?,?)',
        [
          antEpidemioResult[0].insertId,
          contactoResult[0].insertId,
        ]
      );
      }
        )
     
      await conn.execute(
        'INSERT INTO `pacientes` (idInstitucion, nombre, apellido, sexo, edad, tipoDoc, nroDoc, nacionalidad, telefono, provincia, localidad, calle, nroCalle, piso, depto, codPos, barrioVilla, privadoLibertad, idInfoClinica, idAntEpidemiologicos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          institucion,
          nombre,
          apellido,
          sexo,
          edad,
          tipoDoc,
          nroDoc,
          nacionalidad,
          telefono,
          provincia,
          localidad,
          domicilio,
          nroDom,
          domPiso,
          domDto,
          domCP,
          barrioVilla,
          privadoLibertad,
          pacienteData.aplica ? idInfoClinica : null,
          idAntEpidemiologicos,
        ]
      );

      
    }
  } catch (err) {
    console.log(err);
  } finally {
    conn.removeAllListeners();
    conn.release();
  }
};
