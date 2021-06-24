import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  onClinicaChange,
  onDelSignosSintomas,
  onAddSignosSintomas,
  onDelComorbilidades,
  onAddComorbilidades,
} from 'redux/GestionPacientes/Forms';
import DateFnsUtils from '@date-io/date-fns';
import DialogModal from 'components/DialogModal';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import {
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Fab,
  TextField,
  NativeSelect,
} from '@material-ui/core';
import {
  signosSintomasModalSchema,
  comorbilidadesModalSchema,
} from './validation';

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
    flex: '50%',
    justifyContent: 'center',
    rowGap: '0.5rem',
  },
  formOutline: {
    border: '1px solid black',
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formOutlineError: {
    border: '1px solid red',
    backgroundColor: 'bisque',
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  cardContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
  },
  button: {
    justifyContent: 'center',
    padding: '0',
  },
  fab: {
    margin: '0% 2% 2% 2%',
  },
}));

const InfoClinicaForm = () => {
  const classes = useStyles();
  const formData = useSelector((state) => state.forms.infoClinica);
  const signosSintomas =
    useSelector((state) => state.forms.formOptions.signosSintomas) || [];
  const comorbilidades =
    useSelector((state) => state.forms.formOptions.comorbilidades) || [];
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState({
    signosSintomas: false,
    comorbilidades: false,
  });

  const ComorbilidadesModal = () => {
    const [currComorbilidad, setCurrComorbilidad] = useState({
      id: '0',
      nombre: '',
      descripcion: '',
      error: false,
      errorText: '',
    });
    const handleModalClose = () => {
      setCurrComorbilidad({
        id: '0',
        nombre: '',
        descripcion: '',
        error: false,
        errorText: '',
      });
      setModalOpen((prevState) => ({ ...prevState, comorbilidades: false }));
    };
    const handleModalAdd = async () => {
      let isValid = false;
      await comorbilidadesModalSchema
        .validate({ currComorbilidad }, { abortEarly: false })
        .then((value) => {
          dispatch(
            onAddComorbilidades({
              currComorbilidad,
            })
          );
          isValid = true;
        })
        .catch((err) => {
          setCurrComorbilidad((prevStatus) => ({
            ...prevStatus,
            error: true,
            errorText: 'Campo requerido',
          }));

          isValid = false;
        });
      if (isValid) {
        setCurrComorbilidad({
          id: '0',
          nombre: '',
          descripcion: '',
          error: false,
          errorText: '',
        });
        setModalOpen((prevState) => ({
          ...prevState,
          comorbilidades: false,
        }));
      }
    };

    return (
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalAdd()}
        open={modalOpen.comorbilidades}
        title={'Ingrese una Comorbilidad'}
      >
        <FormControl className={`${classes.formControl} ${classes.field} `}>
          <InputLabel id="comorbilidades-label">Comorbilidades</InputLabel>
          <NativeSelect
            labelId="comorbilidades-label"
            inputProps={{ name: 'comorbilidades' }}
            id="comorbilidades"
            value={currComorbilidad?.id}
            error={currComorbilidad?.error}
            helperText={
              currComorbilidad?.error ? currComorbilidad.errorText : ''
            }
            onChange={(e) =>
              setCurrComorbilidad((prevState) => ({
                ...prevState,
                id: e.target.value,
                nombre: e.target.selectedOptions[0].getAttribute('nombre'),
                descripcion:
                  e.target.selectedOptions[0].getAttribute('descripcion'),
              }))
            }
          >
            <option aria-label="None" value="0" />
            {comorbilidades?.map((p) => (
              <option
                key={`${p.id}-${p.nombre}`}
                value={p.id}
                nombre={p.nombre}
                descripcion={p.descripcion}
              >
                {p.nombre}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <TextField
          id="comorbilidadDescripcion-required"
          key="comorbilidadDescripcion-required"
          inputProps={{ name: 'descripcionComorbilidad' }}
          value={currComorbilidad.descripcion}
          disabled
          label="Descripción"
          variant="outlined"
        />
      </DialogModal>
    );
  };

  const SignosSintomasModal = () => {
    const [currSignosSintomas, setCurrSignosSintomas] = useState({
      id: '0',
      nombre: '',
      descripcion: '',
      error: false,
      errorText: '',
    });

    const handleModalClose = () => {
      setCurrSignosSintomas({
        id: '0',
        nombre: '',
        descripcion: '',
        error: false,
        errorText: '',
      });
      setModalOpen((prevState) => ({ ...prevState, signosSintomas: false }));
    };

    const handleModalAdd = async () => {
      let isValid = false;
      await signosSintomasModalSchema
        .validate({ currSignosSintomas }, { abortEarly: false })
        .then(async (value) => {
          await dispatch(
            onAddSignosSintomas({
              currSignosSintomas,
            })
          );
          isValid = true;
        })
        .catch((err) => {
          setCurrSignosSintomas((prevStatus) => ({
            ...prevStatus,
            error: true,
            errorText: 'Campo requerido',
          }));

          isValid = false;
        });
      if (isValid) {
        setCurrSignosSintomas({
          id: '0',
          nombre: '',
          descripcion: '',
          error: false,
          errorText: '',
        });
        setModalOpen((prevState) => ({ ...prevState, signosSintomas: false }));
      }
    };
    return (
      <DialogModal
        onClose={() => handleModalClose('SignosSintomas')}
        onAdd={() => handleModalAdd('SignosSintomas')}
        open={modalOpen.signosSintomas}
        title={'Ingrese un Signo o Síntoma'}
      >
        <FormControl className={`${classes.formControl} ${classes.field} `}>
          <InputLabel id="signosSintomas-label">Signo o Síntoma</InputLabel>
          <NativeSelect
            labelId="signosSintomas-label"
            inputProps={{ name: 'signosSintomas' }}
            id="signosSintomas"
            value={currSignosSintomas?.id}
            error={currSignosSintomas?.error}
            helperText={
              currSignosSintomas?.error ? currSignosSintomas.errorText : ''
            }
            onChange={(e) => {
              console.log(e);
              setCurrSignosSintomas((prevState) => ({
                ...prevState,
                id: e.target.value,
                nombre: e.target.selectedOptions[0].getAttribute('nombre'),
                descripcion:
                  e.target.selectedOptions[0].getAttribute('descripcion'),
              }));
            }}
          >
            <option aria-label="None" value="0" />
            {signosSintomas?.map((p) => (
              <option
                key={`${p.id}-${p.nombre}`}
                value={p.id}
                nombre={p.nombre}
                descripcion={p.descripcion}
              >
                {p.nombre}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <TextField
          required
          id="signosSintomasDescripcion-required"
          key="signosSintomasDescripcion-required"
          inputProps={{ name: 'descripcionSignosSintomas' }}
          value={currSignosSintomas.descripcion}
          label="Descripción"
          variant="outlined"
          disabled
        />
      </DialogModal>
    );
  };

  return (
    <>
      <ComorbilidadesModal />
      <SignosSintomasModal />
      <Container>
        <form className={classes.form} noValidate autoComplete="off">
          <h3 style={{ margin: '0.3rem' }}>Información Clínica</h3>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ justifyContent: 'center' }}
                  row
                  aria-label="aplica"
                  name="aplica"
                  value={formData?.aplica.value}
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="No Aplica"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Aplica"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="fechaFis"
                  label="Fecha de inicio 1° síntoma(fis)"
                  format="MM/dd/yyyy"
                  disabled={formData?.aplica.value === '0' ? true : false}
                  value={formData?.fechaFis.value}
                  error={formData?.fechaFis.error}
                  helperText={
                    formData?.fechaFis.error ? formData?.fechaFis.errorText : ''
                  }
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
                        name: 'fechaFis',
                        value: e.getTime(),
                      })
                    )
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.formColumn}>
              <FormControl className={classes.formControl}>
                <InputLabel id="semanaFis-label">
                  Semana epidemiológica fis
                </InputLabel>
                <NativeSelect
                  labelId="semanaFis-label"
                  name="semanaFis"
                  id="semanaFis"
                  disabled={formData?.aplica.value === '0' ? true : false}
                  error={formData?.semanaFis.error}
                  helperText={
                    formData?.semanaFis.error
                      ? formData?.semanaFis.errorText
                      : ''
                  }
                  value={formData?.semanaFis.value}
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option aria-label="None" value="0" />
                  <option value={1}>Semana 1</option>
                  <option value={2}>Semana 2</option>
                  <option value={3}>Semana 3</option>
                  <option value={4}>Semana 4</option>
                  <option value={5}>Semana 5</option>
                </NativeSelect>
              </FormControl>
            </div>
          </div>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="fechaPrimeraConsulta"
                  label="Fecha de 1° consulta"
                  format="MM/dd/yyyy"
                  disabled={formData?.aplica.value === '0' ? true : false}
                  error={formData?.fechaPrimeraConsulta.error}
                  helperText={
                    formData?.fechaPrimeraConsulta.error
                      ? formData?.fechaPrimeraConsulta.errorText
                      : ''
                  }
                  value={formData?.fechaPrimeraConsulta.value}
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
                        name: 'fechaPrimeraConsulta',
                        value: e.getTime(),
                      })
                    )
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.formColumn}>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ justifyContent: 'center' }}
                  row
                  aria-label="estadoInternacion"
                  name="estadoInternacion"
                  disabled={formData?.aplica.value === '0' ? true : false}
                  value={formData?.estadoInternacion.value}
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <FormControlLabel
                    disabled={formData?.aplica.value === '0' ? true : false}
                    value="2"
                    control={<Radio />}
                    label="Ambulatorio"
                  />
                  <FormControlLabel
                    disabled={formData?.aplica.value === '0' ? true : false}
                    value="1"
                    control={<Radio />}
                    label="Internado"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={classes.formContent}>
            <div
              className={
                formData?.signosSintomas.error
                  ? `${classes.formColumn} ${classes.formOutlineError}`
                  : `${classes.formColumn} ${classes.formOutline}`
              }
            >
              <h3 style={{ margin: '0.3rem' }}>Signos y Síntomas</h3>
              <div className={classes.cardContainer}>
                {formData?.signosSintomas.value.map((c) => (
                  <Card
                    key={`${c.id}-${c.nombre}`}
                    className={classes.cardRoot}
                    raised
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.nombre}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.button}>
                      <Button
                        onClick={() => {
                          dispatch(onDelSignosSintomas({ id: c.id }));
                        }}
                        disabled={formData?.aplica.value === '0' ? true : false}
                        size="small"
                      >
                        Borrar
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>

              <Fab
                color="primary"
                aria-label="add"
                disabled={formData?.aplica.value === '0' ? true : false}
                className={classes.fab}
                onClick={() =>
                  setModalOpen((prevState) => ({
                    ...prevState,
                    signosSintomas: true,
                  }))
                }
              >
                <AddIcon />
              </Fab>
            </div>
            <div className={`${classes.formColumn} ${classes.formOutline}`}>
              <h3 style={{ margin: '0.3rem' }}>
                Enfermedades Previas/Comorbilidades
              </h3>
              <div className={classes.cardContainer}>
                {formData.comorbilidades.value.map((c) => (
                  <Card
                    key={`${c.id}-${c.nombre}`}
                    className={classes.cardRoot}
                    raised
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {c.nombre}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.button}>
                      <Button
                        onClick={() => {
                          dispatch(onDelComorbilidades({ id: c.id }));
                        }}
                        size="small"
                        disabled={formData?.aplica.value === '0' ? true : false}
                      >
                        Borrar
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
              <Fab
                disabled={formData?.aplica.value === '0' ? true : false}
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={() =>
                  setModalOpen((prevState) => ({
                    ...prevState,
                    comorbilidades: true,
                  }))
                }
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default InfoClinicaForm;
