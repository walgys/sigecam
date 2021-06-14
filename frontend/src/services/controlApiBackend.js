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
      .catch((err) => console.log(err));
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
        return { isAuth: false, data: {}, errorMessage: 'Error' };
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
          .catch((err) => console.log(err));
      default:
        break;
    }
  };

  getListaUsuarios = (criterio) => {};

  getListaInstituciones = (criterio) => {};

  getListaTipoInstitucion = () => {};

  getListaUbicaRecu = (idInstitucion) => {};

  getListaTiposRecurso = () => {};

  getListaPacientes = (idInstitucion) => {};

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
      .catch((err) => console.log(err));
  };

  getListaRegionesSanitarias = () => {};

  getEstadistica = (criterio) => {};
}

export default controlApiBackend;
