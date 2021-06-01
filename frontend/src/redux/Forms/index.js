import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AntEpidemioForm1 } from 'components/Forms/AntEpidemioForms';
import { useDispatch } from 'react-redux';
import formsAPI from './formsAPI';

export const getFormOptionsProvincias = createAsyncThunk(
  'forms/getFormOptions/provincias',
  async () => {
    return await formsAPI.getFormOptionsProvincias();
  }
);

export const getFormOptionsLocalidades = createAsyncThunk(
  'forms/getFormOptions/localidades',
  async (provincia) => {
    return await formsAPI.getFormOptionsLocalidades(provincia);
  }
);

export const altaPacienteInitialState = {
  nombre: { value: '', error: false },
  apellido: { value: '', error: false },
  sexo: { value: '1' },
  edad: { value: '0', error: false },
  tipoDoc: { value: '1' },
  numeroDoc: { value: '', error: false },
  nacionalidad: { value: '', error: false },
  provincia: { value: '0', error: false },
  localidad: { value: '0', error: false },
  domicilio: { value: '', error: false },
  nroDom: { value: '', error: false },
  domPiso: { value: '', error: false },
  domDto: { value: '', error: false },
  domCP: { value: '', error: false },
  domBarrio: { value: '', error: false },
  privadoLib: { value: false },
};

export const antEpidemioInitialState = {
  viajoRiesgoFueraPais: { value: '0' },
  viajoRiesgoDentroPais: { value: '0' },
  contactoEstrechoCovid: { value: '0' },
  contactoEstrechoCovidNombre: { value: '', error: false },
  idDniSnvs: { value: '', error: false },
  atencionSaludCovid: { value: '0' },
  vacunacionGripal: { value: '0' },
  fechaVacunaGripal: { value: Date.now() },
  trabajadorSalud: { value: '0' },
  trabajadorSaludColegaInfectado: { value: '0' },
  trabajadorSaludDesconoceNexo: { value: '0' },
  asistioCasosConfirmados: { value: '0' },
  posibleTransmisionComunitaria: { value: '0' },
  congloInstitucional: { value: 'Hospital / Clinica Asistencial' },
  nombreDireccionInstitucion: { value: '', error: false },
  contactos: [],
};

export const infoClinicaInitialState = {
  fechaFis: { value: Date.now() },
  semanaFis: { value: '', error: false },
  primeraConsulta: { value: Date.now() },
  estadoInternacion: { value: '0' },
  signosSintomas: [],
  comorbilidades: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    requiredFields: {
      altaPaciente: [
        'nombre',
        'apellido',
        'sexo',
        'edad',
        'tipoDoc',
        'numeroDoc',
        'nacionalidad',
        'domBarrio',
        'provincia',
        'localidad',
        'domicilio',
        'domNum',
        'domPiso',
        'domDto',
        'domCP',
      ],
      antEpidemio: [{ form1: [] }, { form2: [] }, { form3: [] }],

      infoClinica: [],
    },
    altaPaciente: altaPacienteInitialState,
    antEpidemio: antEpidemioInitialState,
    infoClinica: infoClinicaInitialState,
    formOptions: {
      provincias: [],
      localidades: [],
    },
  },
  reducers: {
    onAltaChange: (state, { payload }) => {
      console.log(payload);
      if (typeof payload?.value !== 'undefined')
        state.altaPaciente[payload.name].value = payload?.value;

      if (typeof payload?.error !== 'undefined')
        state.altaPaciente[payload.name].error = payload?.error;
    },
    onClinicaChange: (state, { payload }) => {
      if (typeof payload?.value !== 'undefined')
        state.infoClinica[payload.name].value = payload?.value;

      if (typeof payload?.error !== 'undefined')
        state.infoClinica[payload.name].error = payload?.error;
    },
    onEpidemioChange: (state, { payload }) => {
      if (typeof payload?.value !== 'undefined')
        state.antEpidemio[payload.name].value = payload?.value;

      if (typeof payload?.error !== 'undefined')
        state.antEpidemio[payload.name].error = payload?.error;
    },
    onAddSignosSintomas: (state, { payload }) => {
      state.infoClinica.signosSintomas = [
        ...state.infoClinica.signosSintomas,
        {
          signoSintoma: payload.currSignosSintomas,
          descripcion: payload.currSignosSintomasDescripcion,
        },
      ];
    },
    onAddComorbilidades: (state, { payload }) => {
      state.infoClinica.signosSintomas = [
        ...state.infoClinica.comorbilidades,
        {
          comorbilidad: payload.currComorbilidad,
          descripcion: payload.currComorbDescripcion,
        },
      ];
    },
    onAddContactos: (state, { payload }) => {
      state.antEpidemio.contactos = [...state.antEpidemio.contactos, payload];
    },
  },
  extraReducers: {
    [getFormOptionsProvincias.fulfilled]: (state, { payload }) => {
      state.formOptions.provincias = payload?.provincias;
    },
    [getFormOptionsLocalidades.fulfilled]: (state, { payload }) => {
      state.formOptions.localidades = payload?.localidades;
    },
  },
});

export const {
  onAltaChange,
  onClinicaChange,
  onEpidemioChange,
  onAddSignosSintomas,
  onAddComorbilidades,
  onAddContactos,
} = formsSlice.actions;
export default formsSlice.reducer;
