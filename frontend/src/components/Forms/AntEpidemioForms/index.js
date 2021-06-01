import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { onEpidemioChange, onAddContactos } from 'redux/Forms';
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
  const formData = useSelector((state) => state.forms.antEpidemio);
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
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Viajó a alguna zona de riesgo para COVID-19 dentro del país ?"
          radioLabel="viajo-riesgo-dentro-pais"
          radioName="viajoRiesgoDentroPais"
          radioValue={formData?.viajoRiesgoDentroPais.value}
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Mantuvo contacto estrecho con casos informados de COVID-19 ?"
          radioLabel="contacto-estrecho-covid"
          radioName="contactoEstrechoCovid"
          radioValue={formData?.contactoEstrechoCovid.value}
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
              onChange={(e) =>
                dispatch(
                  onEpidemioChange({
                    name: e.target.name,
                    value: e.target.value,
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
              label="DNO o ID SNVS"
              name="idDniSnvs"
              variant="outlined"
              value={formData?.idDniSnvs.value}
              onChange={(e) =>
                dispatch(
                  onEpidemioChange({
                    name: e.target.name,
                    value: e.target.value,
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
          radioValue={formData?.contactoEstrechoCovid.value}
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Antecedentes vacunación gripal ?"
          radioLabel="antecedentes-vacuna-gripal"
          radioName="vacunacionGripal"
          radioValue={formData?.vacunacionGripal.value}
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
                onChange={(e) =>
                  dispatch(
                    onEpidemioChange({
                      name: e.target.name,
                      value: e.target.value,
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
        />
      </form>
    </Container>
  );
};

const AntEpidemioForm2 = () => {
  const classes = useStyles();
  const formData = useSelector((state) => state.forms.antEpidemio);
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
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Es trabajador de la salud y desconoce el nexo epidemiológico ?"
          radioLabel="trabajador-salud-desconoce-nexo"
          radioName="trabajadorSaludDesconoceNexo"
          radioValue={formData?.trabajadorSaludDesconoceNexo.value}
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Asistió como personal de salud a casos confirmados de COVID-19 ?"
          radioLabel="asistio-casos-confirmados-covid"
          radioName="asistioCasosConfirmados"
          radioValue={formData?.asistioCasosConfirmados.value}
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Posible transmisión comunitaria ?"
          radioLabel="posible-transmision-comunitaria-covid"
          radioName="posibleTransmisionComunitaria"
          radioValue={formData?.posibleTransmisionComunitaria.value}
        />
        <div className={`${classes.form} ${classes.formContentBlue}`}>
          <div className={classes.formColumnFull}>
            <FormColumnTextYesNo
              classes={classes}
              question="¿ Posible transmisión comunitaria ?"
              radioLabel="posible-transmision-comunitaria-covid"
              radioName="posibleTransmisionComunitaria"
              radioValue={formData?.posibleTransmisionComunitaria.value}
            ></FormColumnTextYesNo>
            <div className={`${classes.formContent}`}>
              <div className={classes.formColumnBig}>
                <FormControl
                  className={classes.formControl}
                  style={{ width: '100%' }}
                >
                  <InputLabel id="congloInstitucional-label">
                    Tipo Doc
                  </InputLabel>
                  <NativeSelect
                    labelId="congloInstitucional-label"
                    inputProps={{ name: 'congloInstitucional' }}
                    id="congloInstitucional"
                    value={formData?.congloInstitucional.value}
                    disabled={
                      formData?.posibleTransmisionComunitaria.value !== '1'
                        ? false
                        : true
                    }
                    onChange={(e) =>
                      dispatch(
                        onEpidemioChange({
                          name: e.target.name,
                          value: e.target.value,
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
                  onChange={(e) =>
                    dispatch(
                      onEpidemioChange({
                        name: e.target.name,
                        value: e.target.value,
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
  const [currContacto, setCurrContacto] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    domicilio: '',
    fechaUltimoContacto: Date.now(),
    tipoContacto: '',
  });
  const formData = useSelector((state) => state.forms.antEpidemio);
  const dispatch = useDispatch();

  const modalChildren = [
    <TextField
      required
      id="nombre-required"
      key="nombre-required"
      inputProps={{ name: 'nombre' }}
      label="Nombre"
      variant="outlined"
      onChange={(e) =>
        setCurrContacto((prevState) => ({
          ...prevState,
          nombre: e.target.value,
        }))
      }
    />,
    <TextField
      required
      id="dni-required"
      key="dni-required"
      inputProps={{ name: 'dni' }}
      label="DNI"
      variant="outlined"
      onChange={(e) =>
        setCurrContacto((prevState) => ({
          ...prevState,
          dni: e.target.value,
        }))
      }
    />,
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
          telefono: e.target.value,
        }))
      }
    />,
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
          domicilio: e.target.value,
        }))
      }
    />,
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
            fechaUltimoContacto: e.target.value,
          }))
        }
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>,
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
          tipoContacto: e.target.value,
        }))
      }
    />,
  ];

  const openAddContactoModal = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrContacto({
      nombre: '',
      dni: '',
      telefono: '',
      domicilio: '',
      fechaUltimoContacto: Date.now(),
      tipoContacto: '',
    });
    setModalOpen(false);
  };
  const handleModalAdd = () => {
    dispatch(onAddContactos(currContacto));
    setCurrContacto({
      nombre: '',
      dni: '',
      telefono: '',
      domicilio: '',
      fechaUltimoContacto: Date.now(),
      tipoContacto: '',
    });
    setModalOpen(false);
  };

  return (
    <>
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalAdd()}
        open={modalOpen}
        title={'Agregar un contacto'}
      >
        {modalChildren}
      </DialogModal>

      <Container>
        <form className={classes.form} noValidate autoComplete="off">
          <h3 style={{ margin: '0.3rem' }}>
            Personas con las que estuvo en contacto durante la enfermedad
          </h3>
          <div className={classes.formContent}>
            <div className={classes.form}>
              <div className={classes.formContent}>
                {formData?.contactos.map((c, idx) => (
                  <Card
                    key={`${c.idx}-${c.dni.value}`}
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
                  onClick={() => openAddContactoModal()}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export { AntEpidemioForm1, AntEpidemioForm2, AntEpidemioForm3 };
