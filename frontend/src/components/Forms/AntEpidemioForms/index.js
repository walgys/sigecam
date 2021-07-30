import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  onEpidemioChange,
  onAddContactos,
  onDelContactos,
  onInstitucionChange,
  onModifyContactos,
} from 'redux/GestionPacientes/Forms';
import AddIcon from '@material-ui/icons/Add';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Fab,
  InputLabel,
  FormControl,
  NativeSelect,
  TextField,
  Typography,
} from '@material-ui/core';
import FormColumnTextYesNo from './FormColumnTextYesNo';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DialogModal from 'components/DialogModal';
import { addContactoModalSchema } from './validation';
import { ContactsOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
    border: '1px solid black',
    borderRadius: '15px',
    padding: '2%',
    flexWrap: 'wrap',
  },
  formContent: {
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    columnGap: '2rem',
  },
  formContentWrap: {
    flexWrap: 'wrap',
  },
  formContentBlue: {
    width: '100%',
    background: '#EBF2FA',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: '25%',
    justifyContent: 'center',
    rowGap: '0.5rem',
  },
  formColumnBig: {
    flex: '70%',
    alignItems: 'flex-start',
  },
  formColumnSmall: {
    flex: '30%',
    alignItems: 'flex-end',
  },
  formColumnFull: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: '0.5rem',
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  cardRoot: {
    minWidth: 150,
    maxWidth: 250,
    margin: '2%',
    alignItems: 'center',
    border: '1px solid gainsboro',
  },
  cardContent: {
    borderBottom: '1px solid gainsboro',
    padding: '0',
  },
  button: {
    justifyContent: 'center',
    padding: '0',
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: 500,
  },
}));

const AntEpidemioForm1 = (props) => {
  const { tipoPaciente } = props;
  const classes = useStyles();
  const formData = useSelector((state) => state.forms.antEpidemio.form1);
  const dispatch = useDispatch();
  return (
    <Container>
      <form className={classes.form} noValidate autoComplete="off">
        <h3 style={{ margin: '0.3rem' }}>Antecedentes Epidemiológicos</h3>
        <div className={`${classes.formContent}`}>
          <div
            className={`${classes.formColumn} ${classes.formContentBlue} ${classes.formColumnSmall}`}
          >
            <Typography>En los últimos 14 días</Typography>
          </div>
          <div
            className={`${classes.formColumn} ${classes.formColumnBig}`}
          ></div>
        </div>

        <FormColumnTextYesNo
          classes={classes}
          question="¿ Viajó a alguna zona de riesgo para COVID-19 fuera del país ?"
          radioLabel="viajo-riesgo-fuera-pais"
          radioName="fueraPais"
          radioValue={formData?.fueraPais.value}
          form="form1"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Viajó a alguna zona de riesgo para COVID-19 dentro del país ?"
          radioLabel="viajo-riesgo-dentro-pais"
          radioName="dentroPais"
          radioValue={formData?.dentroPais.value}
          form="form1"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Mantuvo contacto estrecho con casos informados de COVID-19 ?"
          radioLabel="contacto-estrecho-covid"
          radioName="contactoCasos"
          radioValue={formData?.contactoCasos.value}
          form="form1"
        />
        <div className={classes.formContent}>
          <div className={`${classes.formColumn} ${classes.formColumnBig}`}>
            {' '}
            <TextField
              style={{ width: '100%' }}
              required
              id="nomApeCaso-required"
              label="Apellido y nombre del caso"
              name="nomApeCaso"
              variant="outlined"
              value={formData?.nomApeCaso.value}
              error={formData?.nomApeCaso.error}
              helperText={
                formData?.nomApeCaso.error ? formData?.nomApeCaso.errorText : ''
              }
              onChange={(e) =>
                dispatch(
                  onEpidemioChange({
                    name: e.target.name,
                    value: e.target.value,
                    form: 'form1',
                  })
                )
              }
            />
          </div>
          <div className={`${classes.formColumn} ${classes.formColumnSmall}`}>
            {' '}
            <TextField
              required
              id="idCaso-required"
              label="DNI o ID SNVS"
              name="idCaso"
              variant="outlined"
              value={formData?.idCaso.value}
              error={formData?.idCaso.error}
              helperText={
                formData?.idCaso.error ? formData?.idCaso.errorText : ''
              }
              onChange={(e) =>
                dispatch(
                  onEpidemioChange({
                    name: e.target.name,
                    value: e.target.value,
                    form: 'form1',
                  })
                )
              }
            />
          </div>
        </div>
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Recibió atención en algún centro de salud que atiende casos COVID-19 ?"
          radioLabel="atencion-salud-covid"
          radioName="atencionEnCentro"
          radioValue={formData?.atencionEnCentro.value}
          form="form1"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Antecedentes vacunación gripal ?"
          radioLabel="antecedentes-vacuna-gripal"
          radioName="antVacGripal"
          radioValue={formData?.antVacGripal.value}
          form="form1"
        >
          <div className={`${classes.formColumn} ${classes.formColumnSmall}`}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="fecVacGripal"
                label="Fecha de vacunación"
                format="MM/dd/yyyy"
                inputProps={{ name: 'fecVacGripal' }}
                value={formData?.fecVacGripal.value}
                error={formData?.fecVacGripal.error}
                helperText={
                  formData?.fecVacGripal.error
                    ? formData?.fecVacGripal.errorText
                    : ''
                }
                onChange={(e) =>
                  dispatch(
                    onEpidemioChange({
                      name: 'fecVacGripal',
                      value: e.getTime(),
                      form: 'form1',
                    })
                  )
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </FormColumnTextYesNo>
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Es trabajador de salud ?"
          radioLabel="trabajador-salud"
          radioName="trabajoSalud"
          radioValue={formData?.trabajoSalud.value}
          form="form1"
        />
      </form>
    </Container>
  );
};

const AntEpidemioForm2 = (props) => {
  const { tipoPaciente } = props;
  const classes = useStyles();
  const formData = useSelector((state) => state.forms.antEpidemio.form2);
  const dispatch = useDispatch();

  const conglomeradosInstitucionales = [
    { id: 1, nombre: 'Hospital / Clinica Asistencial' },
    { id: 2, nombre: 'Institución penitenciaria' },
    { id: 3, nombre: 'Residencia para personas mayores' },
    { id: 4, nombre: 'Institución de salud mental' },
    { id: 5, nombre: 'Otros' },
  ];

  return (
    <Container>
      <form className={classes.form} noValidate autoComplete="off">
        <h3 style={{ margin: '0.3rem' }}>
          Antecedentes Epidemiológicos trabajador de salud
        </h3>

        <FormColumnTextYesNo
          classes={classes}
          question="¿ Es trabajador de la salud y pudo haberse contagiado de un colega infectado ?"
          radioLabel="trabajador-salud-colega-infectado"
          radioName="contagioColega"
          radioValue={formData?.contagioColega.value}
          form="form2"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Es trabajador de la salud y desconoce el nexo epidemiológico ?"
          radioLabel="trabajador-salud-desconoce-nexo"
          radioName="nexoDesconocido"
          radioValue={formData?.nexoDesconocido.value}
          form="form2"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Asistió como personal de salud a casos confirmados de COVID-19 ?"
          radioLabel="asistio-casos-confirmados-covid"
          radioName="asistInfectado"
          radioValue={formData?.asistInfectado.value}
          form="form2"
        />

        <div className={`${classes.form} ${classes.formContentBlue}`}>
          <div className={classes.formColumnFull}>
            <FormColumnTextYesNo
              classes={classes}
              question="¿ Posible transmisión comunitaria ?"
              radioLabel="posible-transmision-comunitaria-covid"
              radioName="transComunitaria"
              radioValue={formData?.transComunitaria.value}
              form="form2"
            ></FormColumnTextYesNo>
            <div className={`${classes.formContent}`}>
              <div className={classes.formColumnBig}>
                <FormControl
                  className={classes.formControl}
                  style={{ width: '100%' }}
                >
                  <InputLabel id="congloCasos-label">
                    Conglomerado institucional
                  </InputLabel>
                  <NativeSelect
                    labelId="congloCasos-label"
                    inputProps={{ name: 'congloCasos' }}
                    id="congloCasos"
                    value={formData?.congloCasos.value}
                    disabled={
                      formData?.transComunitaria.value === '1' ? false : true
                    }
                    onChange={(e) =>
                      dispatch(
                        onEpidemioChange({
                          name: e.target.name,
                          value: e.target.value,
                          form: 'form2',
                        })
                      )
                    }
                  >
                    {conglomeradosInstitucionales.map((c) => (
                      <option key={c.id} aria-label={c.nombre} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </div>
              <div className={classes.formColumnBig}>
                <TextField
                  style={{ width: '100%' }}
                  required
                  id="nombre-direccion-institucion-required"
                  name="nombreDireccionInstitucion"
                  label="Nombre y dirección de la institución"
                  variant="outlined"
                  value={formData?.nombreDireccionInstitucion.value}
                  error={formData?.nombreDireccionInstitucion.error}
                  helperText={
                    formData?.nombreDireccionInstitucion.error
                      ? formData?.nombreDireccionInstitucion.errorText
                      : ''
                  }
                  onChange={(e) =>
                    dispatch(
                      onEpidemioChange({
                        name: e.target.name,
                        value: e.target.value,
                        form: 'form2',
                      })
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

const AntEpidemioForm3 = (props) => {
  const { tipoPaciente } = props;
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const formData = useSelector((state) => state.forms.antEpidemio.form3);
  const dispatch = useDispatch();
  const [modalIndex, setModalIndex] = useState(
    formData.contactos.value.length + 1
  );

  const instituciones = useSelector(
    (state) => state.forms.formOptions.instituciones
  );
  const user = useSelector((state) => state.user.userData);
  const [modify, setModify] = useState(false);
  const [contacto, setContacto] = useState({});

  const AddContactoModal = (props) => {
    const { modify, contacto } = props;
    const provincias = useSelector(
      (state) => state.forms.formOptions.provincias
    );
    const sexo = useSelector((state) => state.forms.formOptions.sexo);
    const nacionalidades = useSelector(
      (state) => state.forms.formOptions.nacionalidades
    );
    const tipoDoc = useSelector((state) => state.forms.formOptions.tipoDoc);
    const localidades = useSelector(
      (state) => state.forms.formOptions.localidades
    );

    useEffect(() => {
      if (modify === true)
        setCurrContacto({
          nombre: { value: contacto.nombre, error: false, errorText: '' },
          apellido: { value: contacto.apellido, error: false, errorText: '' },
          sexo: { value: contacto.sexo, error: false, errorText: '' },
          tipoDoc: { value: contacto.tipoDoc, error: false, errorText: '' },
          nroDoc: { value: contacto.nroDoc, error: false, errorText: '' },
          nacionalidad: {
            value: contacto.nacionalidad,
            error: false,
            errorText: '',
          },
          provincia: { value: contacto.provincia, error: false, errorText: '' },
          localidad: { value: contacto.localidad, error: false, errorText: '' },
          calle: { value: contacto.calle, error: false, errorText: '' },
          telefono: { value: contacto.telefono, error: false, errorText: '' },
          nroCalle: { value: contacto.nroCalle, error: false, errorText: '' },
          piso: { value: contacto.piso, error: false, errorText: '' },
          depto: { value: contacto.depto, error: false, errorText: '' },
          codPos: { value: contacto.codPos, error: false, errorText: '' },
          barrioVilla: {
            value: contacto.barrioVilla,
            error: false,
            errorText: '',
          },
          ultimoContacto: {
            value:
              typeof contacto.ultimoContacto === 'number'
                ? contacto.ultimoContacto
                : Date.parse(contacto.ultimoContacto),
            error: false,
            errorText: '',
          },
          tipoContacto: {
            value: contacto.tipoContacto,
            error: false,
            errorText: '',
          },
        });
      return () => {};
    }, [modify]);
    const initialState = {
      nombre: { value: '', error: false, errorText: '' },
      apellido: { value: '', error: false, errorText: '' },
      sexo: { value: '0', error: false, errorText: '' },
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
      ultimoContacto: { value: Date.now(), error: false, errorText: '' },
      tipoContacto: { value: '', error: false, errorText: '' },
    };
    const [currContacto, setCurrContacto] = useState(initialState);

    const localidadesFiltradas =
      currContacto.provincia.value === '0'
        ? { localidades: [] }
        : localidades.filter(
            (l) => l.id === parseInt(currContacto.provincia.value, 0)
          )[0];

    const handleModalClose = () => {
      setModalOpen(false);
    };

    const handleModalAdd = async () => {
      let isValid = false;
      await addContactoModalSchema
        .validate(currContacto, { abortEarly: false })
        .then(async (value) => {
          if (modify === true) {
            await dispatch(
              onModifyContactos({
                id: contacto.id,
                idPc: contacto.idPc,
                nombre: currContacto.nombre.value,
                apellido: currContacto.apellido.value,
                sexo: currContacto.sexo.value,
                tipoDoc: currContacto.tipoDoc.value,
                nroDoc: currContacto.nroDoc.value,
                nacionalidad: currContacto.nacionalidad.value,
                provincia: currContacto.provincia.value,
                localidad: currContacto.localidad.value,
                calle: currContacto.calle.value,
                telefono: currContacto.telefono.value,
                nroCalle: currContacto.nroCalle.value,
                piso: currContacto.piso.value,
                depto: currContacto.depto.value,
                codPos: currContacto.codPos.value,
                barrioVilla: currContacto.barrioVilla.value,
                ultimoContacto: currContacto.ultimoContacto.value,
                tipoContacto: currContacto.tipoContacto.value,
              })
            );
          } else {
            await dispatch(
              onAddContactos({
                id: modalIndex,
                nombre: currContacto.nombre.value,
                apellido: currContacto.apellido.value,
                sexo: currContacto.sexo.value,
                tipoDoc: currContacto.tipoDoc.value,
                nroDoc: currContacto.nroDoc.value,
                nacionalidad: currContacto.nacionalidad.value,
                provincia: currContacto.provincia.value,
                localidad: currContacto.localidad.value,
                calle: currContacto.calle.value,
                telefono: currContacto.telefono.value,
                nroCalle: currContacto.nroCalle.value,
                piso: currContacto.piso.value,
                depto: currContacto.depto.value,
                codPos: currContacto.codPos.value,
                barrioVilla: currContacto.barrioVilla.value,
                ultimoContacto: currContacto.ultimoContacto.value,
                tipoContacto: currContacto.tipoContacto.value,
              })
            );
          }

          setModalIndex((prevState) => prevState + 1);
          isValid = true;
        })
        .catch((err) => {
          if (err?.name === 'ValidationError') {
            let updateCurrContacto = { ...currContacto };
            err.inner.map((e) => {
              updateCurrContacto[e.path.replace('.value', '')] = {
                value: currContacto[e.path.replace('.value', '')].value,
                error: true,
                errorText: e.message,
              };
            });

            setCurrContacto(updateCurrContacto);
            isValid = false;
          }
        });
      if (isValid) {
        setModify(false);
        setCurrContacto(initialState);
        setModalOpen(false);
      }
    };

    return (
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalAdd()}
        open={modalOpen}
        title={'Agregar un contacto'}
        acceptText={modify === true ? 'Modificar' : 'Agregar'}
      >
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <TextField
              required
              id="nombre-required"
              key="nombre-required"
              inputProps={{ name: 'nombre' }}
              label="Nombre"
              value={currContacto?.nombre.value}
              error={currContacto?.nombre.error}
              helperText={
                currContacto?.nombre.error ? currContacto?.nombre.errorText : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  nombre: { ...prevState.nombre, value: e.target.value },
                }))
              }
            />
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="apellido-required"
              key="apellido-required"
              inputProps={{ name: 'apellido' }}
              label="apellido"
              error={currContacto?.apellido.error}
              helperText={
                currContacto?.apellido.error
                  ? currContacto?.apellido.errorText
                  : ''
              }
              value={currContacto?.apellido.value}
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  apellido: { ...prevState.apellido, value: e.target.value },
                }))
              }
            />
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="tipoDoc-label">Tipo Doc</InputLabel>
              <NativeSelect
                labelId="tipoDoc-label"
                inputProps={{ name: 'tipoDoc' }}
                id="tipoDoc"
                value={currContacto?.tipoDoc.value}
                error={currContacto?.tipoDoc.error}
                helperText={
                  currContacto?.tipoDoc?.error
                    ? currContacto?.tipoDoc?.errorText
                    : ''
                }
                onChange={(e) =>
                  setCurrContacto((prevState) => ({
                    ...prevState,
                    tipoDoc: { ...prevState.tipoDoc, value: e.target.value },
                  }))
                }
              >
                <option aria-label="None" value="0" />
                {tipoDoc?.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="nroDoc-required"
              key="nroDoc-required"
              inputProps={{ name: 'nroDoc' }}
              label="Nro de documento"
              value={currContacto?.nroDoc.value}
              error={currContacto?.nroDoc.error}
              helperText={
                currContacto?.nroDoc.error ? currContacto?.nroDoc.errorText : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  nroDoc: {
                    ...prevState.nroDoc,
                    value: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>

        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <NativeSelect
                labelId="sexo-label"
                inputProps={{ name: 'sexo' }}
                id="sexo"
                value={currContacto?.sexo.value}
                error={currContacto?.sexo.error}
                helperText={
                  currContacto?.sexo?.error ? currContacto?.sexo?.errorText : ''
                }
                onChange={(e) =>
                  setCurrContacto((prevState) => ({
                    ...prevState,
                    sexo: {
                      ...prevState.sexo,
                      value: e.target.value,
                    },
                  }))
                }
              >
                <option aria-label="None" value="0" />
                {sexo?.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="nacionalidad-label">Nacionalidad</InputLabel>
              <NativeSelect
                labelId="nacionalidad-label"
                inputProps={{ name: 'nacionalidad' }}
                id="nacionalidad"
                value={currContacto?.nacionalidad.value}
                error={currContacto?.nacionalidad.error}
                helperText={
                  currContacto?.nacionalidad?.error
                    ? currContacto?.nacionalidad?.errorText
                    : ''
                }
                onChange={(e) =>
                  setCurrContacto((prevState) => ({
                    ...prevState,
                    nacionalidad: {
                      ...prevState.nacionalidad,
                      value: e.target.value,
                    },
                  }))
                }
              >
                <option aria-label="None" value="0" />
                {nacionalidades?.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <TextField
              required
              id="telefono-required"
              key="telefono-required"
              inputProps={{ name: 'telefono' }}
              label="Telefono"
              value={currContacto?.telefono.value}
              error={currContacto?.telefono.error}
              helperText={
                currContacto?.telefono.error
                  ? currContacto?.telefono.errorText
                  : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  telefono: { ...prevState.telefono, value: e.target.value },
                }))
              }
            />
          </div>
          <div className={classes.formColumn}></div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="provincia-label">Provincia</InputLabel>
              <NativeSelect
                labelId="provincia-label"
                inputProps={{ name: 'provincia' }}
                id="provincia"
                value={currContacto?.provincia.value}
                error={currContacto?.provincia.error}
                helperText={
                  currContacto?.provincia?.error
                    ? currContacto?.provincia?.errorText
                    : ''
                }
                onChange={(e) =>
                  setCurrContacto((prevState) => ({
                    ...prevState,
                    provincia: {
                      ...prevState.provincia,
                      value: e.target.value,
                    },
                  }))
                }
              >
                <option aria-label="None" value="0" />
                {provincias?.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="localidad-label">Localidad</InputLabel>
              <NativeSelect
                labelId="localidad-label"
                inputProps={{ name: 'localidad' }}
                id="localidad"
                value={currContacto?.localidad.value}
                error={currContacto?.localidad.error}
                helperText={
                  currContacto?.localidad?.error
                    ? currContacto?.localidad?.errorText
                    : ''
                }
                onChange={(e) =>
                  setCurrContacto((prevState) => ({
                    ...prevState,
                    localidad: {
                      ...prevState.localidad,
                      value: e.target.value,
                    },
                  }))
                }
              >
                <option aria-label="None" value="0" />
                {localidadesFiltradas.localidades.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <TextField
              required
              id="calle-required"
              key="calle-required"
              inputProps={{ name: 'calle' }}
              label="calle"
              value={currContacto?.calle.value}
              error={currContacto?.calle.error}
              helperText={
                currContacto?.calle.error ? currContacto?.calle.errorText : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  calle: { ...prevState.calle, value: e.target.value },
                }))
              }
            />
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="nroCalle-required"
              key="nroCalle-required"
              inputProps={{ name: 'nroCalle' }}
              label="Nro"
              value={currContacto?.nroCalle.value}
              error={currContacto?.nroCalle.error}
              helperText={
                currContacto?.nroCalle.error
                  ? currContacto?.nroCalle.errorText
                  : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  nroCalle: { ...prevState.calle, value: e.target.value },
                }))
              }
            />
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <TextField
              required
              id="codPos-required"
              key="codPos-required"
              inputProps={{ name: 'codPos' }}
              label="CP"
              value={currContacto?.codPos.value}
              error={currContacto?.codPos.error}
              helperText={
                currContacto?.codPos.error ? currContacto?.codPos.errorText : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  codPos: { ...prevState.codPos, value: e.target.value },
                }))
              }
            />
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="piso-required"
              key="piso-required"
              inputProps={{ name: 'piso' }}
              label="Piso"
              value={currContacto?.piso.value}
              error={currContacto?.piso.error}
              helperText={
                currContacto?.piso.error ? currContacto?.piso.errorText : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  piso: { ...prevState.piso, value: e.target.value },
                }))
              }
            />
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="depto-required"
              key="depto-required"
              inputProps={{ name: 'depto' }}
              label="Dto"
              value={currContacto?.depto.value}
              error={currContacto?.depto.error}
              helperText={
                currContacto?.depto.error ? currContacto?.depto.errorText : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  depto: { ...prevState.depto, value: e.target.value },
                }))
              }
            />
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumnFull}>
            <TextField
              required
              id="barrioVilla-required"
              key="barrioVilla-required"
              inputProps={{ name: 'barrioVilla' }}
              label="Barrio/Villa"
              value={currContacto?.barrioVilla.value}
              error={currContacto?.barrioVilla.error}
              helperText={
                currContacto?.barrioVilla.error
                  ? currContacto?.barrioVilla.errorText
                  : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  barrioVilla: {
                    ...prevState.barrioVilla,
                    value: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="ultimoContacto"
                label="Ultimo Contacto"
                format="MM/dd/yyyy"
                error={currContacto?.ultimoContacto.error}
                helperText={
                  currContacto?.ultimoContacto.error
                    ? currContacto?.ultimoContacto.errorText
                    : ''
                }
                value={currContacto?.ultimoContacto.value}
                onChange={(e) =>
                  setCurrContacto((prevState) => ({
                    ...prevState,
                    ultimoContacto: {
                      ...prevState.ultimoContacto,
                      value: e.getTime(),
                    },
                  }))
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="tipoContacto-required"
              key="tipoContacto-required"
              inputProps={{ name: 'tipoContacto' }}
              label="Tipo de contacto"
              value={currContacto?.tipoContacto.value}
              error={currContacto?.tipoContacto.error}
              helperText={
                currContacto?.tipoContacto.error
                  ? currContacto?.tipoContacto.errorText
                  : ''
              }
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  tipoContacto: {
                    ...prevState.tipoContacto,
                    value: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>
      </DialogModal>
    );
  };

  return (
    <>
      <AddContactoModal modify={modify} contacto={contacto} />
      <Container>
        <div className={classes.form}>
          <h3 style={{ margin: '0.3rem' }}>
            Personas con las que estuvo en contacto durante la enfermedad
          </h3>
          <div className={classes.formContent}>
            <div className={classes.form}>
              <div
                className={`${classes.formContent} ${classes.formContentWrap}`}
              >
                {formData.contactos.value.map((c) => (
                  <Card
                    key={`${c.id}-${c.dni}`}
                    className={classes.cardRoot}
                    raised
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Nombre y Apellido
                      </Typography>
                      <Typography
                        className={classes.subTitle}
                        color="textSecondary"
                        gutterBottom
                      >
                        {`${c.nombre} ${c.apellido}`}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        DNI
                      </Typography>
                      <Typography
                        className={classes.subTitle}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.nroDoc}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.button}>
                      <Button
                        onClick={() => {
                          setContacto(c);
                          setModify(true);
                          setModalOpen(true);
                        }}
                        size="small"
                      >
                        Editar
                      </Button>

                      <Button
                        onClick={() => {
                          dispatch(onDelContactos({ id: c.id }));
                        }}
                        size="small"
                      >
                        Borrar
                      </Button>
                    </CardActions>
                  </Card>
                ))}
                <Fab
                  color="primary"
                  aria-label="add"
                  className={classes.fab}
                  onClick={() => setModalOpen(true)}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
          </div>
          <div className={classes.formContent}>
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="instiucion-label">
                Instiucion de creación
              </InputLabel>
              <NativeSelect
                labelId="instiucion-label"
                inputProps={{ name: 'instiucion' }}
                id="instiucion"
                value={
                  user.tipoUsuario === 1
                    ? formData?.institucion.value
                    : user.idInstitucion
                }
                error={formData?.institucion?.error}
                helperText={
                  formData?.institucion.error
                    ? formData?.institucion.errorText
                    : ''
                }
                disabled={user.tipoUsuario === 1 ? false : true}
                onChange={(e) =>
                  dispatch(
                    onInstitucionChange({
                      ...formData?.institucion,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="0" />
                {instituciones.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
        </div>
      </Container>
    </>
  );
};

export { AntEpidemioForm1, AntEpidemioForm2, AntEpidemioForm3 };
