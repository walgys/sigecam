import { createSlice } from '@reduxjs/toolkit';

export const constants = createSlice({
  name: 'colors',
  initialState: {
    colors: {
      blue: 'blue',
      green: 'green',
      red: 'red',
      black: 'black',
      darkViolet: 'darkViolet',
      lightViolet: 'lightViolet',
    },
    accessByUserType: [
      {
        id: 1,
        role: 'Administrador de Sistema',
        allowedRoutes: [
          { route: '/gestiones', page: 'Gestiones' },
          { route: '/gestiones/grupos', page: 'GestGrupos' },
          { route: '/gestiones/usuarios', page: 'GestUsuarios' },
          { route: '/gestiones/instituciones', page: 'GestInstituciones' },
          { route: '/gestiones/recursos', page: 'GestRecursos' },
          {
            route: '/gestiones/recursos/instituciones',
            page: 'GestRecInstituciones',
          },
          { route: '/gestiones/recursos/generales', page: 'GestRecGenerales' },
          { route: '/gestiones/pacientes', page: 'Pacientes' },
          { route: '/gestiones/pacientes/recursos', page: 'PacientesRecursos' },
          { route: '/gestiones/pacientes/datos', page: 'PacientesDatos' },
          {
            route: '/gestiones/pacientes/datos/existente',
            page: 'PacientesDatosExistente',
          },
          {
            route: '/gestiones/pacientes/datos/nuevo',
            page: 'PacientesDatosNuevo',
          },
          { route: '/gestiones/pacientes/estado', page: 'PacientesEstado' },
          { route: '/estadisticas', page: 'Estadistica' },
          { route: '/estadisticas/total', page: 'EstadisticasTotal' },
          { route: '/mapa', page: 'Mapa' },
        ],
      },
      {
        id: 2,
        role: 'Responsable estadística nacional',
        allowedRoutes: [
          { route: '/estadisticas', page: 'Estadistica' },
          { route: '/estadisticas/nacional', page: 'EstadisticasNacional' },
        ],
      },
      {
        id: 3,
        role: 'Responsable estadística provincial',
        allowedRoutes: [
          { route: '/estadisticas', page: 'Estadistica' },
          { route: '/estadisticas/provincial', page: 'EstadisticasProvincial' },
        ],
      },
      {
        id: 4,
        role: 'Responsable estadística regional',
        allowedRoutes: [
          { route: '/estadisticas', page: 'Estadistica' },
          { route: '/estadisticas/regional', page: 'EstadisticasRegional' },
        ],
      },
      {
        id: 5,
        role: 'Administrador de institución',
        allowedRoutes: [
          { route: '/gestiones', page: 'Gestiones' },
          { route: '/gestiones/instituciones', page: 'GestInstituciones' },
          {
            route: '/gestiones/recursos/instituciones',
            page: 'GestRecInstituciones',
          },
          { route: '/gestiones/pacientes', page: 'Pacientes' },
          { route: '/gestiones/pacientes/recursos', page: 'PacientesRecursos' },
          { route: '/gestiones/pacientes/datos', page: 'PacientesDatos' },
          {
            route: '/gestiones/pacientes/datos/existente',
            page: 'PacientesDatosExistente',
          },
          {
            route: '/gestiones/pacientes/datos/nuevo',
            page: 'PacientesDatosNuevo',
          },
          { route: '/gestiones/pacientes/estado', page: 'PacientesEstado' },
          { route: '/estadisticas', page: 'Estadistica' },
          {
            route: '/estadisticas/institucion',
            page: 'EstadisticasInstitucion',
          },
          { route: '/mapa', page: 'Mapa' },
        ],
      },
      {
        id: 6,
        role: 'Operador',
        allowedRoutes: [
          { route: '/gestiones', page: 'Gestiones' },
          { route: '/gestiones/pacientes', page: 'Pacientes' },
          { route: '/gestiones/pacientes/recursos', page: 'PacientesRecursos' },
          { route: '/gestiones/pacientes/datos', page: 'PacientesDatos' },
          {
            route: '/gestiones/pacientes/datos/existente',
            page: 'PacientesDatosExistente',
          },
          {
            route: '/gestiones/pacientes/datos/nuevo',
            page: 'PacientesDatosNuevo',
          },
          { route: '/gestiones/pacientes/estado', page: 'PacientesEstado' },

          { route: '/mapa', page: 'Mapa' },
        ],
      },
    ],
  },
  reducers: {},
});

export default constants.reducer;
