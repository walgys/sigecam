import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  onEpidemioChange,
  onAddContactos,
  getFormOptionsLocalidades,
  getFormOptionsProvincias,
} from 'redux/Forms';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  NativeSelect,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import FormColumnTextYesNo from './FormColumnTextYesNo';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import DialogModal from 'components/DialogModal';

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
  },
  cardContent: {
    padding: '0',
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 500,
  },
}));

const AntEpidemioForm1 = () => {
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
          radioName="viajoRiesgoFueraPais"
          radioValue={formData?.viajoRiesgoFueraPais.value}
          form="form1"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Viajó a alguna zona de riesgo para COVID-19 dentro del país ?"
          radioLabel="viajo-riesgo-dentro-pais"
          radioName="viajoRiesgoDentroPais"
          radioValue={formData?.viajoRiesgoDentroPais.value}
          form="form1"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Mantuvo contacto estrecho con casos informados de COVID-19 ?"
          radioLabel="contacto-estrecho-covid"
          radioName="contactoEstrechoCovid"
          radioValue={formData?.contactoEstrechoCovid.value}
          form="form1"
        />
        <div className={classes.formContent}>
          <div className={`${classes.formColumn} ${classes.formColumnBig}`}>
            {' '}
            <TextField
              style={{ width: '100%' }}
              required
              id="contactoEstrechoCovidNombre-required"
              label="Apellido y nombre del caso"
              name="contactoEstrechoCovidNombre"
              variant="outlined"
              value={formData?.contactoEstrechoCovidNombre.value}
              error={formData?.contactoEstrechoCovidNombre.error}
              helperText={
                formData?.contactoEstrechoCovidNombre.error
                  ? formData?.contactoEstrechoCovidNombre.errorText
                  : ''
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
              id="idDniSnvs-required"
              label="DNI o ID SNVS"
              name="idDniSnvs"
              variant="outlined"
              value={formData?.idDniSnvs.value}
              error={formData?.idDniSnvs.error}
              helperText={
                formData?.idDniSnvs.error ? formData?.idDniSnvs.errorText : ''
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
          radioName="atencionSaludCovid"
          radioValue={formData?.atencionSaludCovid.value}
          form="form1"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Antecedentes vacunación gripal ?"
          radioLabel="antecedentes-vacuna-gripal"
          radioName="vacunacionGripal"
          radioValue={formData?.vacunacionGripal.value}
          form="form1"
        >
          <div className={`${classes.formColumn} ${classes.formColumnSmall}`}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="fechaVacunaGripal"
                label="Fecha de vacunación"
                format="MM/dd/yyyy"
                inputProps={{ name: 'fechaVacunaGripal' }}
                value={formData?.fechaVacunaGripal.value}
                error={formData?.fechaVacunaGripal.error}
                helperText={
                  formData?.fechaVacunaGripal.error
                    ? formData?.fechaVacunaGripal.errorText
                    : ''
                }
                onChange={(e) =>
                  dispatch(
                    onEpidemioChange({
                      name: 'fechaVacunaGripal',
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
          radioName="trabajadorSalud"
          radioValue={formData?.trabajadorSalud.value}
          form="form1"
        />
      </form>
    </Container>
  );
};

const AntEpidemioForm2 = () => {
  const classes = useStyles();
  const formData = useSelector((state) => state.forms.antEpidemio.form2);
  const dispatch = useDispatch();

  const conglomeradosInstitucionales = [
    'Hospital / Clinica Asistencial',
    'Institución penitenciaria',
    'Residencia para personas mayores',
    'Institución de salud mental',
    'Otros',
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
          radioName="trabajadorSaludColegaInfectado"
          radioValue={formData?.trabajadorSaludColegaInfectado.value}
          form="form2"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Es trabajador de la salud y desconoce el nexo epidemiológico ?"
          radioLabel="trabajador-salud-desconoce-nexo"
          radioName="trabajadorSaludDesconoceNexo"
          radioValue={formData?.trabajadorSaludDesconoceNexo.value}
          form="form2"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Asistió como personal de salud a casos confirmados de COVID-19 ?"
          radioLabel="asistio-casos-confirmados-covid"
          radioName="asistioCasosConfirmados"
          radioValue={formData?.asistioCasosConfirmados.value}
          form="form2"
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Posible transmisión comunitaria ?"
          radioLabel="posible-transmision-comunitaria-covid"
          radioName="posibleTransmisionComunitaria"
          radioValue={formData?.posibleTransmisionComunitaria.value}
          form="form2"
        />
        <div className={`${classes.form} ${classes.formContentBlue}`}>
          <div className={classes.formColumnFull}>
            <FormColumnTextYesNo
              classes={classes}
              question="¿ Posible transmisión comunitaria ?"
              radioLabel="posible-transmision-comunitaria-covid"
              radioName="posibleTransmisionComunitaria"
              radioValue={formData?.posibleTransmisionComunitaria.value}
              form="form2"
            ></FormColumnTextYesNo>
            <div className={`${classes.formContent}`}>
              <div className={classes.formColumnBig}>
                <FormControl
                  className={classes.formControl}
                  style={{ width: '100%' }}
                >
                  <InputLabel id="congloInstitucional-label">
                    Conglomerado institucional
                  </InputLabel>
                  <NativeSelect
                    labelId="congloInstitucional-label"
                    inputProps={{ name: 'congloInstitucional' }}
                    id="congloInstitucional"
                    value={formData?.congloInstitucional.value}
                    disabled={
                      formData?.posibleTransmisionComunitaria.value === '1'
                        ? false
                        : true
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
                      <option key={c} aria-label={c} value={c}>
                        {c}
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

const AntEpidemioForm3 = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const formData = useSelector((state) => state.forms.antEpidemio.form3);

  const AddContactoModal = () => {
    const provincias = useSelector(
      (state) => state.forms.formOptions.provincias
    );
    const nacionalidades = useSelector(
      (state) => state.forms.formOptions.nacionalidades
    );
    const sexo = useSelector((state) => state.forms.formOptions.sexo);
    const tipoDoc = useSelector((state) => state.forms.formOptions.tipoDoc);
    const localidades =
      useSelector((state) => state.forms.formOptions.localidades) || [];

    const dispatch = useDispatch();

    const [currContacto, setCurrContacto] = useState({
      nombre: { value: '', error: false, errorText: '' },
      apellido: { value: '', error: false, errorText: '' },
      sexo: { value: '0', error: false, errorText: '' },
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
      fechaUltimoContacto: { value: Date.now(), error: false, errorText: '' },
      tipoContacto: { value: '0', error: false, errorText: '' },
    });
    const localidadesFiltradas =
      currContacto.provincia.value === '0'
        ? { localidades: [] }
        : localidades.filter(
            (l) => l.id === parseInt(currContacto.provincia.value, 0)
          )[0];

    const handleModalClose = () => {
      setCurrContacto({
        nombre: { value: '', error: false, errorText: '' },
        apellido: { value: '', error: false, errorText: '' },
        sexo: { value: '0', error: false, errorText: '' },
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
        fechaUltimoContacto: { value: Date.now(), error: false, errorText: '' },
        tipoContacto: { value: '0', error: false, errorText: '' },
      });
      setModalOpen(false);
    };
    const handleModalAdd = () => {
      dispatch(onAddContactos(currContacto));
      setModalOpen(false);
    };

    return (
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalAdd()}
        open={modalOpen}
        title={'Agregar un contacto'}
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
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  nombre: { ...prevState.nombre, value: e.target.value },
                }))
              }
            />
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="tipoDoc-label">Tipo Doc</InputLabel>
              <NativeSelect
                labelId="tipoDoc-label"
                inputProps={{ name: 'tipoDoc' }}
                id="tipoDoc"
                value={currContacto?.tipoDoc.value}
                error={currContacto?.tipoDoc.error}
                helperText={
                  formData?.tipoDoc?.error ? formData?.tipoDoc?.errorText : ''
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
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="provincia-label">Provincia</InputLabel>
              <NativeSelect
                labelId="provincia-label"
                inputProps={{ name: 'provincia' }}
                id="provincia"
                value={currContacto?.provincia.value}
                error={currContacto?.provincia.error}
                helperText={
                  formData?.provincia?.error
                    ? formData?.provincia?.errorText
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
            <TextField
              required
              id="apellido-required"
              key="apellido-required"
              inputProps={{ name: 'apellido' }}
              label="apellido"
              value={currContacto?.apellido.value}
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  apellido: { ...prevState.apellido, value: e.target.value },
                }))
              }
            />
            <TextField
              required
              id="numeroDoc-required"
              key="numeroDoc-required"
              inputProps={{ name: 'numeroDoc' }}
              label="Nro de documento"
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  numeroDoc: { ...prevState.numeroDoc, value: e.target.value },
                }))
              }
            />
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="localidad-label">Localidad</InputLabel>
              <NativeSelect
                labelId="localidad-label"
                inputProps={{ name: 'localidad' }}
                id="localidad"
                value={currContacto?.localidad.value}
                error={currContacto?.localidad.error}
                helperText={
                  formData?.localidad?.error
                    ? formData?.localidad?.errorText
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
            <TextField
              required
              id="telefono-required"
              key="telefono-required"
              inputProps={{ name: 'telefono' }}
              label="Telefono"
              variant="outlined"
              onChange={(e) =>
                setCurrContacto((prevState) => ({
                  ...prevState,
                  telefono: { ...prevState.telefono, value: e.target.value },
                }))
              }
            />
          </div>
        </div>
        <TextField
          required
          id="domicilio-required"
          key="domicilio-required"
          inputProps={{ name: 'domicilio' }}
          label="Domicilio"
          variant="outlined"
          onChange={(e) =>
            setCurrContacto((prevState) => ({
              ...prevState,
              domicilio: { ...prevState.domicilio, value: e.target.value },
            }))
          }
        />
        ,
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="fechaUltimoContacto"
            label="Fecha de inicio 1° síntoma(fis)"
            format="MM/dd/yyyy"
            inputProps={{ name: 'fechaFis' }}
            value={Date.now()}
            onChange={(e) =>
              setCurrContacto((prevState) => ({
                ...prevState,
                fechaUltimoContacto: {
                  ...prevState.fechaUltimoContacto,
                  value: e.getTime(),
                },
              }))
            }
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        ,
        <TextField
          required
          id="tipoContacto-required"
          key="tipoContacto-required"
          inputProps={{ name: 'tipoContacto' }}
          label="Tipo de contacto"
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
      </DialogModal>
    );
  };

  return (
    <>
      <AddContactoModal />
      <Container>
        <div className={classes.form}>
          <h3 style={{ margin: '0.3rem' }}>
            Personas con las que estuvo en contacto durante la enfermedad
          </h3>
          <div className={classes.formContent}>
            <div className={classes.form}>
              <div className={classes.formContent}>
                {formData?.contactos.value.map((c, idx) => (
                  <Card
                    key={`${idx}-${c.dni.value}`}
                    className={classes.cardRoot}
                    variant="outlined"
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Nombre
                      </Typography>
                      <Typography
                        className={classes.subTitle}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.nombre.value}
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
                        {c.dni.value}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Teléfono
                      </Typography>
                      <Typography
                        className={classes.subTitle}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.telefono.value}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Domicilio
                      </Typography>
                      <Typography
                        className={classes.subTitle}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.domicilio.value}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Fecha último contacto
                      </Typography>
                      <Typography
                        className={classes.subTitle}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.fechaUltimoContacto.value}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Tipo de contacto
                      </Typography>
                      <Typography
                        className={classes.subTitle}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.tipoContacto.value}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.button}>
                      <Button size="small">Borrar</Button>
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
        </div>
      </Container>
    </>
  );
};

export { AntEpidemioForm1, AntEpidemioForm2, AntEpidemioForm3 };
