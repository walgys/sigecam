import { createSlice } from '@reduxjs/toolkit';

export const constants = createSlice({
  name: 'constants',
  initialState: {
    colors: {
      blue: 'blue',
      green: 'green',
      red: 'red',
      black: 'black',
      darkViolet: 'darkViolet',
      lightViolet: 'lightViolet',
    },
    resultTypes: {
      ERROR: 'ERROR',
      OK: 'OK',
      SUCCESS: 'SUCCESS',
      INVALID_TOKEN: 'INVALID_TOKEN',
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

          {
            route: '/gestiones/pacientes/existente',
            page: 'PacientesExistente',
          },
          {
            route: '/gestiones/pacientes/existente/recursos',
            page: 'PacientesRecursos',
          },
          {
            route: '/gestiones/pacientes/existente/datos',
            page: 'PacientesDatosExistente',
          },
          {
            route: '/gestiones/pacientes/existente/estado',
            page: 'PacientesEstado',
          },
          {
            route: '/gestiones/pacientes/nuevo',
            page: 'PacientesDatosNuevo',
          },

          { route: '/estadisticas', page: 'Estadistica' },
          { route: '/estadisticas/total', page: 'EstadisticasTotal' },
          { route: '/mapa', page: 'Mapa' },
          { route: '/logs', page: 'Logs' },
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
          {
            route: '/gestiones/pacientes/existente',
            page: 'PacientesExistente',
          },
          {
            route: '/gestiones/pacientes/existente/recursos',
            page: 'PacientesRecursos',
          },
          {
            route: '/gestiones/pacientes/existente/datos',
            page: 'PacientesDatosExistente',
          },
          {
            route: '/gestiones/pacientes/existente/estado',
            page: 'PacientesEstado',
          },
          {
            route: '/gestiones/pacientes/nuevo',
            page: 'PacientesDatosNuevo',
          },
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

          {
            route: '/gestiones/pacientes/existente',
            page: 'PacientesExistente',
          },
          {
            route: '/gestiones/pacientes/existente/recursos',
            page: 'PacientesRecursos',
          },
          {
            route: '/gestiones/pacientes/existente/datos',
            page: 'PacientesDatosExistente',
          },
          {
            route: '/gestiones/pacientes/existente/estado',
            page: 'PacientesEstado',
          },
          {
            route: '/gestiones/pacientes/nuevo',
            page: 'PacientesDatosNuevo',
          },

          { route: '/mapa', page: 'Mapa' },
        ],
      },
    ],
    routeIcons: [
      { route: '/gestiones', icon: 'AccountBoxTwoTone' },
      { route: '/gestiones/grupos', icon: 'GroupTwoTone' },
      { route: '/gestiones/usuarios', icon: 'AssignmentIndTwoTone' },
      { route: '/gestiones/instituciones', icon: 'BusinessTwoTone' },
      { route: '/gestiones/recursos', icon: 'ExtensionTwoTone' },
      {
        route: '/gestiones/recursos/instituciones',
        icon: 'AssignmentIndTwoTone',
      },
      { route: '/gestiones/recursos/generales', icon: 'GroupTwoTone' },
      { route: '/gestiones/pacientes', icon: 'FaceTwoTone' },

      {
        route: '/gestiones/pacientes/existente',
        icon: 'AirlineSeatIndividualSuiteTwoTone',
      },
      {
        route: '/gestiones/pacientes/existente/recursos',
        icon: 'AccountTreeTwoTone',
      },
      {
        route: '/gestiones/pacientes/existente/estado',
        icon: 'TransferWithinAStationTwoTone',
      },
      {
        route: '/gestiones/pacientes/existente/datos',
        icon: 'PersonPinTwoTone',
      },
      {
        route: '/gestiones/pacientes/nuevo',
        icon: 'PersonAddTwoTone',
      },

      { route: '/estadisticas', icon: 'AssessmentTwoTone' },
      { route: '/estadisticas/total', icon: 'AssessmentTwoTone' },
      {
        route: '/estadisticas/institucion',
        icon: 'AssessmentTwoTone',
      },
      { route: '/estadisticas/regional', icon: 'AssessmentTwoTone' },
      { route: '/estadisticas/provincial', icon: 'AssessmentTwoTone' },
      { route: '/estadisticas/nacional', icon: 'AssessmentTwoTone' },
      { route: '/mapa', icon: 'EditLocationTwoTone' },
      { route: '/logs', icon: 'PageviewTwoTone' },
    ],
  },

  reducers: {},
});

export default constants.reducer;
