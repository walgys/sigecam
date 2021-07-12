import axios from 'axios';
import { API_URL } from 'utils';

class controlApiBackend {
  constructor() {
    if (typeof controlApiBackend.instance === 'object') {
      return controlApiBackend.instance;
    }
    controlApiBackend.instance = this;
    return this;
  }

  autentificarUsuario = async (userName, password) => {
    return axios({
      url: `${API_URL}/api/v1/login`,
      method: 'POST', // *GET, POST, PUT, DELETE, etc
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({
        userName,
        password,
      }), // body data type must match "Content-Type" header
    })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
        return { isAuth: false, data: {}, errorMessage: 'Error de conexión' };
      });
  };

  validarSesion = async () => {
    return axios({
      url: `${API_URL}/api/v1/session`,
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      withCredentials: true,
    })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
        return { isAuth: false, data: {}, errorMessage: 'Error de conexión' };
      });
  };

  crudUsuario = (usuario, tarea) => {};

  crudInstitucion = (institucion, tarea) => {};

  crudGrupo = (grupo, tarea) => {};

  crudPaciente = async (paciente, tarea) => {
    switch (tarea) {
      case 1:
        return axios({
          url: `${API_URL}/api/v1/createNewPacient  `,
          method: 'POST', // *GET, POST, PUT, DELETE, etc
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: JSON.stringify(paciente), // body data type must match "Content-Type" header
        })
          .then((result) => result.data)
          .catch((err) => {
            return { data: {}, errorMessage: 'Error de conexión' };
          });
      default:
        break;
    }
  };

  getListaUsuarios = (criterio) => {};

  getListaInstituciones = async (criterio) => {};

  getListaTipoInstitucion = () => {};

  getListaUbicaRecu = (idInstitucion) => {};

  getListaTiposRecurso = () => {};

  getListaPacientes = async (idInstitucion) => {
    return axios({
      url: `${API_URL}/api/v1/getPatients  `,
      method: 'POST', // *GET, POST, PUT, DELETE, etc
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify(idInstitucion), // body data type must match "Content-Type" header
    })
      .then((result) => result.data)
      .catch((err) => {
        return { data: {}, errorMessage: 'Error de conexión' };
      });
  };

  getRecursosPaciente = async (idPaciente) => {
    return axios({
      url: `${API_URL}/api/v1/getPatientResourses  `,
      method: 'POST', // *GET, POST, PUT, DELETE, etc
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({ idPaciente: idPaciente }), // body data type must match "Content-Type" header
    })
      .then((result) => result.data)
      .catch((err) => {
        return { data: {}, errorMessage: 'Error de conexión' };
      });
  };

  getPaciente = (idPaciente) => {};

  getListaGrupos = (tipoUsuario) => {};

  getListaPermisos = (tiposUsuario) => {};

  getDatosFormularios = async () => {
    return axios({
      url: `${API_URL}/api/v1/getFormOptions`,
      method: 'POST', // *GET, POST, PUT, DELETE, etc
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
        return { data: {}, errorMessage: 'Error de conexión' };
      });
  };

  getListaRegionesSanitarias = () => {};

  getEstadistica = (criterio) => {};
}

export default controlApiBackend;
