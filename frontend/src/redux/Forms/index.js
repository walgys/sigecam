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
  nombre: { value: '', error: false, errorText: '' },
  apellido: { value: '', error: false, errorText: '' },
  sexo: { value: '0', error: false, errorText: '' },
  edad: { value: '0', error: false, errorText: '' },
  tipoDoc: { value: '0', error: false, errorText: '' },
  numeroDoc: { value: '', error: false, errorText: '' },
  nacionalidad: { value: '0', error: false, errorText: '' },
  provincia: { value: '0', error: false, errorText: '' },
  localidad: { value: '0', error: false, errorText: '' },
  domicilio: { value: '', error: false, errorText: '' },
  nroDom: { value: '', error: false, errorText: '' },
  domPiso: { value: '', error: false, errorText: '' },
  domDto: { value: '', error: false, errorText: '' },
  domCP: { value: '', error: false, errorText: '' },
  domBarrio: { value: '', error: false, errorText: '' },
  privadoLib: { value: false, error: false, errorText: '' },
};

export const antEpidemioInitialState = {
  viajoRiesgoFueraPais: { value: '0' },
  viajoRiesgoDentroPais: { value: '0' },
  contactoEstrechoCovid: { value: '0' },
  contactoEstrechoCovidNombre: { value: '', error: false, errorText: '' },
  idDniSnvs: { value: '', error: false, errorText: '' },
  atencionSaludCovid: { value: '0' },
  vacunacionGripal: { value: '0' },
  fechaVacunaGripal: { value: Date.now() },
  trabajadorSalud: { value: '0' },
  trabajadorSaludColegaInfectado: { value: '0' },
  trabajadorSaludDesconoceNexo: { value: '0' },
  asistioCasosConfirmados: { value: '0' },
  posibleTransmisionComunitaria: { value: '0' },
  congloInstitucional: { value: 'Hospital / Clinica Asistencial' },
  nombreDireccionInstitucion: { value: '', error: false, errorText: '' },
  contactos: { value: [], error: false, errorText: '' },
};

export const infoClinicaInitialState = {
  fechaFis: { value: Date.now(), error: false, errorText: '' },
  semanaFis: {
    value: '',
    error: false,
    errorText: '',
    error: false,
    errorText: '',
  },
  primeraConsulta: { value: Date.now(), error: false, errorText: '' },
  estadoInternacion: { value: '0', error: false, errorText: '' },
  signosSintomas: { value: [], error: false, errorText: '' },
  comorbilidades: { value: [], error: false, errorText: '' },
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
      state.infoClinica.signosSintomas.value = [
        ...state.infoClinica.signosSintomas.value,
        {
          signoSintoma: payload.currSignosSintomas,
          descripcion: payload.currSignosSintomasDescripcion,
        },
      ];
    },
    onAddComorbilidades: (state, { payload }) => {
      state.infoClinica.comorbilidades.value = [
        ...state.infoClinica.comorbilidades.value,
        {
          comorbilidad: payload.currComorbilidad,
          descripcion: payload.currComorbDescripcion,
        },
      ];
    },
    onAddContactos: (state, { payload }) => {
      state.antEpidemio.contactos.value = [
        ...state.antEpidemio.contactos.value,
        payload,
      ];
    },
    onAltaValidate: (state, { payload }) => {
      if (typeof payload?.value !== 'undefined') {
        Object.entries(state.altaPaciente).map(([k, ap]) => {
          ap.error = false;
          ap.errorText = '';
        });
        if (!payload?.isvalid) {
          payload.value.map((o) => {
            state.altaPaciente[o.name].error = o.error;
            state.altaPaciente[o.name].errorText = o.errorText;
          });
        }
      }
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
  onAltaValidate,
} = formsSlice.actions;
export default formsSlice.reducer;
