import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    altaPaciente: {
      nombre: '',
      apellido: '',
      sexo: '',
      edad: '',
      tipoDoc: '',
      numeroDoc: '',
      nacionalidad: '',
      provincia: '',
      localidad: '',
      domicilio: '',
      domNum: '',
      domPiso: '',
      domDto: '',
      domCP: '',
      domBarrio: '',
      privadoLib: true,
    },
    antEpidemio: {
      viajoRiesgoFueraPais: '0',
      viajoRiesgoDentroPais: '0',
      contactoEstrechoCovid: '0',
      contactoEstrechoCovidNombre: '',
      idDniSnvs: '',
      atencionSaludCovid: '0',
      vacunacionGripal: '0',
      fechaVacunaGripal: Date.now(),
      trabajadorSalud: '0',
    },
    infoClinica: {
      fechaFis: Date.now(),
      semanaFis: '',
      primeraConsulta: Date.now(),
      estadoInternacion: '0',
      signosSintomas: [],
      comorbilidades: [],
    },
    formOptions: {
      provincias: [],
      localidades: [],
      localidadesStatus: 'ready',
    },
  },
  reducers: {
    onAltaChange: (state, { payload }) => {
      state.altaPaciente[payload.name] = payload?.value;
    },
    onClinicaChange: (state, { payload }) => {
      state.infoClinica[payload.name] = payload?.value;
    },
    onEpidemioChange: (state, { payload }) => {
      state.antEpidemio[payload.name] = payload?.value;
    },
  },
  extraReducers: {
    [getFormOptionsProvincias.fulfilled]: (state, { payload }) => {
      state.formOptions.provincias = payload?.provincias;
    },
    [getFormOptionsLocalidades.pending]: (state) => {
      state.formOptions.localidadesStatus = 'pending';
    },
    [getFormOptionsLocalidades.fulfilled]: (state, { payload }) => {
      state.formOptions.localidades = payload?.localidades;
      state.formOptions.localidadesStatus = 'ready';
    },
  },
});

export const { onAltaChange, onClinicaChange, onEpidemioChange } =
  formsSlice.actions;
export default formsSlice.reducer;
