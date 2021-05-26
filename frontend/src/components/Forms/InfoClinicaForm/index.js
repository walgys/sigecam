import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { onClinicaChange } from 'redux/Forms';
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
} from '@material-ui/core';

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
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalChildren, setModalChildren] = useState([]);
  const [currComorbilidad, setCurrComorbilidad] = useState('');
  const [currComorbDescripcion, setCurrComorbDescripcion] = useState('');
  const [comorbilidades, setComorbilidades] = useState([]);
  const [currSignosSintomas, setCurrSignosSintomas] = useState('');
  const [currSignosSintomasDescripcion, setCurrSignosSintomasDescripcion] =
    useState('');
  const [signosSintomas, setSignosSintomas] = useState([]);

  const handleModalClose = () => {
    setCurrComorbilidad('');
    setCurrComorbDescripcion('');
    setModalOpen(false);
  };
  const handleModalAdd = () => {
    if (modalType === 'Comorbilidades') {
      setComorbilidades([
        ...comorbilidades,
        { comorbilidad: currComorbilidad, descripcion: currComorbDescripcion },
      ]);
      setCurrComorbilidad('');
      setCurrComorbDescripcion('');
    }
    if (modalType === 'SignosSintomas') {
      setSignosSintomas([
        ...signosSintomas,
        {
          signoSintoma: currSignosSintomas,
          descripcion: currSignosSintomasDescripcion,
        },
      ]);
      setCurrSignosSintomas('');
      setCurrSignosSintomasDescripcion('');
    }

    setModalOpen(false);
  };

  const openComorbilidadesModal = () => {
    setModalTitle('Ingrese una Comorbilidad');
    setModalType('Comorbilidades');
    setModalChildren([
      <TextField
        required
        id="comorbilidad-required"
        key="comorbilidad-required"
        inputProps={{ name: 'comorbilidad' }}
        label="Comorbilidad"
        variant="outlined"
        onChange={(e) => setCurrComorbilidad(e.target.value)}
      />,
      <TextField
        required
        id="comorbilidadDescripcion-required"
        key="comorbilidadDescripcion-required"
        inputProps={{ name: 'descripcionComorbilidad' }}
        label="Descripción"
        variant="outlined"
        onChange={(e) => setCurrComorbDescripcion(e.target.value)}
      />,
    ]);
    setModalOpen(true);
  };

  const openSignosSintomasModal = () => {
    setModalTitle('Ingrese un Signo o Síntoma');
    setModalType('SignosSintomas');
    setModalChildren([
      <TextField
        required
        id="signosSintomas-required"
        key="signosSintomas-required"
        inputProps={{ name: 'signosSintomas' }}
        label="Signo o Sintoma"
        variant="outlined"
        onChange={(e) => setCurrSignosSintomas(e.target.value)}
      />,
      <TextField
        required
        id="signosSintomasDescripcion-required"
        key="signosSintomasDescripcion-required"
        inputProps={{ name: 'descripcionSignosSintomas' }}
        label="Descripción"
        variant="outlined"
        onChange={(e) => setCurrSignosSintomasDescripcion(e.target.value)}
      />,
    ]);
    setModalOpen(true);
  };
  return (
    <div>
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalAdd()}
        type={modalType}
        open={modalOpen}
        title={modalTitle}
      >
        {modalChildren}
      </DialogModal>
      <Container>
        <form className={classes.form} noValidate autoComplete="off">
          <h3 style={{ margin: '0.3rem' }}>Información Clínica</h3>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="fechaFis"
                  label="Fecha de inicio 1° síntoma(fis)"
                  format="MM/dd/yyyy"
                  inputProps={{ name: 'fechaFis' }}
                  value={formData?.fechaFis}
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
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
            <div className={classes.formColumn}>
              <FormControl className={classes.formControl}>
                <InputLabel id="semanaFis-label">
                  Semana epidemiológica fis
                </InputLabel>
                <Select
                  labelId="semanaFis-label"
                  name="semanaFis"
                  id="semanaFis"
                  value={formData?.semanaFis}
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="primeraConsulta"
                  label="Fecha de 1° consulta"
                  format="MM/dd/yyyy"
                  inputProps={{ name: 'primeraConsulta' }}
                  value={formData?.primeraConsulta}
                  onChange={(e) =>
                    dispatch(
                      onClinicaChange({
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
            <div className={classes.formColumn}>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ justifyContent: 'center' }}
                  row
                  aria-label="estadoInternacion"
                  name="estadoInternacion"
                  value={formData?.estadoInternacion}
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
                    label="Ambulatorio"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Internado"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={classes.formContent}>
            <div className={`${classes.formColumn} ${classes.formOutline}`}>
              <h3 style={{ margin: '0.3rem' }}>Signos y Síntomas</h3>
              {signosSintomas.map((c, idx) => (
                <Card
                  key={`${c.idx}-${c.comorbilidad}`}
                  className={classes.cardRoot}
                  variant="outlined"
                >
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {c.signoSintoma}
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
                onClick={() => openSignosSintomasModal()}
              >
                <AddIcon />
              </Fab>
            </div>
            <div className={`${classes.formColumn} ${classes.formOutline}`}>
              <h3 style={{ margin: '0.3rem' }}>
                Enfermedades Previas/Comorbilidades
              </h3>
              {comorbilidades.map((c, idx) => (
                <Card
                  key={`${c.idx}-${c.comorbilidad}`}
                  className={classes.cardRoot}
                  variant="outlined"
                >
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {c.comorbilidad}
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
                onClick={() => openComorbilidadesModal()}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default InfoClinicaForm;
