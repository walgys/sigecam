import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AntEpidemioForm1 } from 'components/Forms/AntEpidemioForms';
import { useDispatch } from 'react-redux';
import formsAPI from './formsAPI';

export const getFormOptionsProvincias = createAsyncThunk(
  'forms/getFormOptions',
  async () => {
    return await formsAPI.getFormOptionsProvincias();
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
  telefono: { value: '', error: false, errorText: '' },
  nroDom: { value: '', error: false, errorText: '' },
  domPiso: { value: '', error: false, errorText: '' },
  domDto: { value: '', error: false, errorText: '' },
  domCP: { value: '', error: false, errorText: '' },
  domBarrio: { value: '', error: false, errorText: '' },
  privadoLib: { value: false, error: false, errorText: '' },
};

export const antEpidemioInitialState = {
  form1: {
    viajoRiesgoFueraPais: { value: '0', error: false, errorText: '' },
    viajoRiesgoDentroPais: { value: '0', error: false, errorText: '' },
    contactoEstrechoCovid: { value: '0', error: false, errorText: '' },
    contactoEstrechoCovidNombre: { value: '', error: false, errorText: '' },
    idDniSnvs: { value: '', error: false, errorText: '' },
    atencionSaludCovid: { value: '0', error: false, errorText: '' },
    vacunacionGripal: { value: '0', error: false, errorText: '' },
    fechaVacunaGripal: { value: Date.now(), error: false, errorText: '' },
    trabajadorSalud: { value: '0', error: false, errorText: '' },
  },
  form2: {
    trabajadorSaludColegaInfectado: { value: '0', error: false, errorText: '' },
    trabajadorSaludDesconoceNexo: { value: '0', error: false, errorText: '' },
    asistioCasosConfirmados: { value: '0', error: false, errorText: '' },
    posibleTransmisionComunitaria: { value: '0', error: false, errorText: '' },
    congloInstitucional: {
      value: 'Hospital / Clinica Asistencial',
      error: false,
      errorText: '',
    },
    nombreDireccionInstitucion: { value: '', error: false, errorText: '' },
  },
  form3: {
    contactos: { value: [], error: false, errorText: '' },
  },
};

export const infoClinicaInitialState = {
  aplica: { value: '0' },
  fechaFis: { value: Date.now(), error: false, errorText: '' },
  semanaFis: {
    value: '0',
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
    altaPaciente: altaPacienteInitialState,
    antEpidemio: antEpidemioInitialState,
    infoClinica: infoClinicaInitialState,
    formOptions: {
      provincias: [],
      localidades: [{ id: 0, localidades: [] }],
      nacionalidades: [],
      tipoDoc: [],
      sexo: [],
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
        state.antEpidemio[payload.form][payload.name].value = payload?.value;

      if (typeof payload?.error !== 'undefined')
        state.antEpidemio[payload.form][payload.name].error = payload?.error;
    },
    onAddSignosSintomas: (state, { payload }) => {
      state.infoClinica.signosSintomas.value = [
        ...state.infoClinica.signosSintomas.value,
        {
          id: payload.id,
          signoSintoma: payload.currSignosSintomas,
          descripcion: payload.currSignosSintomasDescripcion,
        },
      ];
    },
    onAddComorbilidades: (state, { payload }) => {
      state.infoClinica.comorbilidades.value = [
        ...state.infoClinica.comorbilidades.value,
        {
          id: payload.id,
          comorbilidad: payload.currComorbilidad,
          descripcion: payload.currComorbDescripcion,
        },
      ];
    },
    onAddContactos: (state, { payload }) => {
      state.antEpidemio.form3.contactos.value = [
        ...state.antEpidemio.form3.contactos.value,
        payload,
      ];
    },
    onDelComorbilidades: (state, { payload }) => {
      state.infoClinica.comorbilidades.value =
        state.infoClinica.comorbilidades.value.filter(
          (c) => c.id !== payload.id
        );
    },
    onDelSignosSintomas: (state, { payload }) => {
      state.infoClinica.signosSintomas.value =
        state.infoClinica.signosSintomas.value.filter(
          (c) => c.id !== payload.id
        );
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
    onInfoClinicaValidate: (state, { payload }) => {
      if (typeof payload?.value !== 'undefined') {
        Object.entries(state.infoClinica).map(([k, ap]) => {
          ap.error = false;
          ap.errorText = '';
        });
        if (!payload?.isvalid) {
          payload.value.map((o) => {
            state.infoClinica[o.name].error = o.error;
            state.infoClinica[o.name].errorText = o.errorText;
          });
        }
      }
    },
    onEpidemioValidate: (state, { payload }) => {
      if (typeof payload?.value !== 'undefined') {
        Object.entries(state.antEpidemio[payload.form]).map(([k, ap]) => {
          ap.error = false;
          ap.errorText = '';
        });
        if (!payload?.isvalid) {
          payload.value.map((o) => {
            state.antEpidemio[payload.form][o.name].error = o.error;
            state.antEpidemio[payload.form][o.name].errorText = o.errorText;
          });
        }
      }
    },
  },
  extraReducers: {
    [getFormOptionsProvincias.fulfilled]: (state, { payload }) => {
      state.formOptions.provincias = payload?.provincias;
      state.formOptions.localidades = payload?.localidades;
      state.formOptions.sexo = payload?.sexo;
      state.formOptions.nacionalidades = payload?.nacionalidades;
      state.formOptions.tipoDoc = payload?.tipoDoc;
    },
  },
});

export const {
  onAltaChange,
  onClinicaChange,
  onEpidemioChange,
  onDelSignosSintomas,
  onAddSignosSintomas,
  onDelComorbilidades,
  onAddComorbilidades,
  onAddContactos,
  onAltaValidate,
  onInfoClinicaValidate,
  onEpidemioValidate,
} = formsSlice.actions;
export default formsSlice.reducer;
