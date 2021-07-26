import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ControlApiBackend from 'services/controlApiBackend';
import { setSnack, setOpenSnack } from 'redux/variables';
import { onTokenExpired } from 'redux/user';

const controlApiBackend = new ControlApiBackend();

export const getDatosFormularios = createAsyncThunk(
  'forms/getFormOptions',
  async (payload, thunkAPI) => {
    const result = await controlApiBackend.getDatosFormularios();
    if (result.errorMessage !== null) {
      thunkAPI.dispatch(
        setSnack({ type: 'error', message: result.errorMessage })
      );
      thunkAPI.dispatch(setOpenSnack(true));
      if (result.error === 'INVALID_TOKEN') thunkAPI.dispatch(onTokenExpired());
    }
    if (payload.tipoPaciente === 'existente') {
      thunkAPI.dispatch(getListaPacientes(payload));
    }
    return result;
  }
);

export const getListaPacientes = createAsyncThunk(
  'forms/getListaPacientes',
  async (payload, thunkAPI) => {
    const result = await controlApiBackend.getListaPacientes(payload);

    if (result.errorMessage !== null) {
      thunkAPI.dispatch(
        setSnack({ type: 'error', message: result.errorMessage })
      );
      thunkAPI.dispatch(setOpenSnack(true));
      if (result.error === 'INVALID_TOKEN') thunkAPI.dispatch(onTokenExpired());
    }
    return result;
  }
);

export const getDatosPaciente = createAsyncThunk(
  'forms/getDatosPaciente',
  async (payload, thunkAPI) => {
    const result = await controlApiBackend.crudPaciente(payload, 3);
    if (result.errorMessage !== null) {
      thunkAPI.dispatch(
        setSnack({ type: 'error', message: result.errorMessage })
      );
      thunkAPI.dispatch(setOpenSnack(true));
      if (result.error === 'INVALID_TOKEN') thunkAPI.dispatch(onTokenExpired());
    }

    return result;
  }
);

export const altaPacienteInitialState = {
  nombre: { value: '', error: false, errorText: '' },
  apellido: { value: '', error: false, errorText: '' },
  sexo: { value: '0', error: false, errorText: '' },
  edad: { value: '0', error: false, errorText: '' },
  tipoDoc: { value: '0', error: false, errorText: '' },
  nroDoc: { value: '', error: false, errorText: '' },
  nacionalidad: { value: '0', error: false, errorText: '' },
  provincia: { value: '0', error: false, errorText: '' },
  localidad: { value: '0', error: false, errorText: '' },
  calle: { value: '', error: false, errorText: '' },
  telefono: { value: '', error: false, errorText: '' },
  nroCalle: { value: '', error: false, errorText: '' },
  piso: { value: '', error: false, errorText: '' },
  depto: { value: '', error: false, errorText: '' },
  codPos: { value: '', error: false, errorText: '' },
  barrioVilla: { value: '', error: false, errorText: '' },
  privadoLibertad: { value: false, error: false, errorText: '' },
};

export const antEpidemioInitialState = {
  form1: {
    fueraPais: { value: '0', error: false, errorText: '' },
    dentroPais: { value: '0', error: false, errorText: '' },
    contactoCasos: { value: '0', error: false, errorText: '' },
    nomApeCaso: { value: '', error: false, errorText: '' },
    idCaso: { value: '', error: false, errorText: '' },
    atencionEnCentro: { value: '0', error: false, errorText: '' },
    antVacGripal: { value: '0', error: false, errorText: '' },
    fecVacGripal: { value: Date.now(), error: false, errorText: '' },
    trabajoSalud: { value: '0', error: false, errorText: '' },
  },
  form2: {
    contagioColega: { value: '0', error: false, errorText: '' },
    nexoDesconocido: { value: '0', error: false, errorText: '' },
    asistInfectado: { value: '0', error: false, errorText: '' },
    transComunitaria: { value: '0', error: false, errorText: '' },
    congloCasos: {
      value: 'Hospital / Clinica Asistencial',
      error: false,
      errorText: '',
    },
    nombreDireccionInstitucion: { value: '', error: false, errorText: '' },
  },
  form3: {
    contactos: { value: [], error: false, errorText: '' },
    institucion: { value: '0', error: false, errorText: '' },
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
  fechaPrimeraConsulta: { value: Date.now(), error: false, errorText: '' },
  estadoInternacion: { value: '2', error: false, errorText: '' },
  signosSintomas: { value: [], error: false, errorText: '' },
  comorbilidades: { value: [], error: false, errorText: '' },
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    id: 0,
    idInfoClinica: 0,
    idAntEpidemiologicos: 0,
    altaPaciente: altaPacienteInitialState,
    antEpidemio: antEpidemioInitialState,
    infoClinica: infoClinicaInitialState,
    formOptions: {
      listaPacientes: [],
      provincias: [],
      localidades: [{ id: 0, localidades: [] }],
      instituciones: [],
      nacionalidades: [],
      tipoDoc: [],
      sexo: [],
      signosSintomas: [],
      comorbilidades: [],
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
    onInstitucionChange: (state, { payload }) => {
      state.antEpidemio.form3.institucion.value = payload.value;
    },

    onAddSignosSintomas: (state, { payload }) => {
      state.infoClinica.signosSintomas.value = [
        ...state.infoClinica.signosSintomas.value,
        payload.currSignosSintomas,
      ];
    },
    onAddComorbilidades: (state, { payload }) => {
      state.infoClinica.comorbilidades.value = [
        ...state.infoClinica.comorbilidades.value,
        payload.currComorbilidad,
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
    onDelContactos: (state, { payload }) => {
      state.antEpidemio.form3.contactos.value =
        state.antEpidemio.form3.contactos.value.filter(
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
    onInstitucionValidate: (state, { payload }) => {
      if (typeof payload?.value !== 'undefined') {
        state.antEpidemio.form3.institucion.error = false;
        state.antEpidemio.form3.institucion.errorText = '';

        if (!payload?.isvalid) {
          payload.value.map((o) => {
            state.antEpidemio.form3.institucion.error = o.error;
            state.antEpidemio.form3.institucion.errorText = o.errorText;
          });
        }
      }
    },
    onPacientesDatosNuevoExit: (state) => {
      state.altaPaciente = altaPacienteInitialState;
      state.antEpidemio = antEpidemioInitialState;
      state.infoClinica = infoClinicaInitialState;
    },
  },
  extraReducers: {
    [getDatosFormularios.fulfilled]: (state, { payload }) => {
      state.formOptions.provincias = payload?.provincias;
      state.formOptions.localidades = payload?.localidades;
      state.formOptions.instituciones = payload?.instituciones;
      state.formOptions.sexo = payload?.sexo;
      state.formOptions.nacionalidades = payload?.nacionalidades;
      state.formOptions.tipoDoc = payload?.tipoDoc;
      state.formOptions.signosSintomas = payload?.signosSintomas;
      state.formOptions.comorbilidades = payload?.comorbilidades;
    },

    [getDatosPaciente.fulfilled]: (state, { payload }) => {
      const { paciente } = payload;
      let { altaPaciente, antEpidemio, infoClinica } = {};
      state.id = paciente.id;
      state.idInfoClinica = paciente.idInfoClinica;
      state.idAntEpidemiologicos = paciente.idAntEpidemiologicos;
      //transformacion de datos
      altaPaciente = {
        nombre: { value: paciente.nombre, error: false, errorText: '' },
        apellido: { value: paciente.apellido, error: false, errorText: '' },
        sexo: { value: paciente.sexo, error: false, errorText: '' },
        edad: { value: paciente.edad, error: false, errorText: '' },
        tipoDoc: { value: paciente.tipoDoc, error: false, errorText: '' },
        nroDoc: { value: paciente.nroDoc, error: false, errorText: '' },
        nacionalidad: {
          value: paciente.nacionalidad,
          error: false,
          errorText: '',
        },
        provincia: { value: paciente.provincia, error: false, errorText: '' },
        localidad: { value: paciente.localidad, error: false, errorText: '' },
        calle: { value: paciente.calle, error: false, errorText: '' },
        telefono: { value: paciente.telefono, error: false, errorText: '' },
        nroCalle: { value: paciente.nroCalle, error: false, errorText: '' },
        piso: { value: paciente.piso, error: false, errorText: '' },
        depto: { value: paciente.depto, error: false, errorText: '' },
        codPos: { value: paciente.codPos, error: false, errorText: '' },
        barrioVilla: {
          value: paciente.barrioVilla,
          error: false,
          errorText: '',
        },
        privadoLibertad: {
          value: paciente.privadoLibertad == 0 ? false : true,
          error: false,
          errorText: '',
        },
      };
      antEpidemio = {
        form1: {
          fueraPais: {
            value: paciente.antEpidemio.fueraPais + '',
            error: false,
            errorText: '',
          },
          dentroPais: {
            value: paciente.antEpidemio.dentroPais + '',
            error: false,
            errorText: '',
          },
          contactoCasos: {
            value: paciente.antEpidemio.contactoCasos + '',
            error: false,
            errorText: '',
          },
          nomApeCaso: {
            value: paciente.antEpidemio.nomApeCaso,
            error: false,
            errorText: '',
          },
          idCaso: {
            value: paciente.antEpidemio.idCaso,
            error: false,
            errorText: '',
          },
          atencionEnCentro: {
            value: paciente.antEpidemio.atencionEnCentro + '',
            error: false,
            errorText: '',
          },
          antVacGripal: {
            value: paciente.antEpidemio.antVacGripal + '',
            error: false,
            errorText: '',
          },
          fecVacGripal: {
            value: Date.parse(paciente.antEpidemio.fecVacGripal),
            error: false,
            errorText: '',
          },
          trabajoSalud: {
            value: paciente.antEpidemio.trabajoSalud + '',
            error: false,
            errorText: '',
          },
        },
        form2: {
          contagioColega: {
            value: paciente.antEpidemio.contagioColega + '',
            error: false,
            errorText: '',
          },
          nexoDesconocido: {
            value: paciente.antEpidemio.nexoDesconocido + '',
            error: false,
            errorText: '',
          },
          asistInfectado: {
            value: paciente.antEpidemio.asistInfectado + '',
            error: false,
            errorText: '',
          },
          transComunitaria: {
            value: paciente.antEpidemio.transComunitaria + '',
            error: false,
            errorText: '',
          },
          congloCasos: {
            value: paciente.antEpidemio.congloCasos,
            error: false,
            errorText: '',
          },
          nombreDireccionInstitucion: {
            value: paciente.antEpidemio.nombreDireccionInstitucion,
            error: false,
            errorText: '',
          },
        },
        form3: {
          contactos: {
            value: paciente.antEpidemio.contactos.map((c, idx) => ({
              ...c,
              id: idx + 1,
            })),
            error: false,
            errorText: '',
          },
          institucion: {
            value: paciente.idInstitucion,
            error: false,
            errorText: '',
          },
        },
      };

      infoClinica = {
        aplica: { value: '1' },
        fechaFis: {
          value: Date.parse(paciente.infoClinica.fechaFis),
          error: false,
          errorText: '',
        },
        semanaFis: {
          value: paciente.infoClinica.semanaFis,
          error: false,
          errorText: '',
        },
        fechaPrimeraConsulta: {
          value: Date.parse(paciente.infoClinica.fechaPrimeraConsulta),
          error: false,
          errorText: '',
        },
        estadoInternacion: {
          value: paciente.infoClinica.estadoInternacion + '',
          error: false,
          errorText: '',
        },
        signosSintomas: {
          value: paciente.infoClinica.signosSintomas,
          error: false,
          errorText: '',
        },
        comorbilidades: {
          value: paciente.infoClinica.comorbilidades,
          error: false,
          errorText: '',
        },
      };

      state.altaPaciente = altaPaciente;
      state.antEpidemio = antEpidemio;
      state.infoClinica = infoClinica;
    },
    [getListaPacientes.fulfilled]: (state, { payload }) => {
      state.formOptions.listaPacientes = payload?.pacientes;
    },
  },
});

export const {
  onAltaChange,
  onClinicaChange,
  onEpidemioChange,
  onInstitucionChange,
  onDelSignosSintomas,
  onAddSignosSintomas,
  onDelComorbilidades,
  onAddComorbilidades,
  onAddContactos,
  onDelContactos,
  onAltaValidate,
  onInfoClinicaValidate,
  onEpidemioValidate,
  onInstitucionValidate,
  onPacientesDatosNuevoExit,
} = formsSlice.actions;
export default formsSlice.reducer;
