import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { onEpidemioChange } from 'redux/Forms';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
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
          radioValue={formData?.viajoRiesgoFueraPais}
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Viajó a alguna zona de riesgo para COVID-19 dentro del país ?"
          radioLabel="viajo-riesgo-dentro-pais"
          radioName="viajoRiesgoDentroPais"
          radioValue={formData?.viajoRiesgoDentroPais}
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Mantuvo contacto estrecho con casos informados de COVID-19 ?"
          radioLabel="contacto-estrecho-covid"
          radioName="contactoEstrechoCovid"
          radioValue={formData?.contactoEstrechoCovid}
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
              value={formData?.contactoEstrechoCovidNombre}
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
              value={formData?.idDniSnvs}
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
          radioValue={formData?.contactoEstrechoCovid}
        />
        <FormColumnTextYesNo
          classes={classes}
          question="¿ Antecedentes vacunación gripal ?"
          radioLabel="antecedentes-vacuna-gripal"
          radioName="vacunacionGripal"
          radioValue={formData?.vacunacionGripal}
        >
          <div className={`${classes.formColumn} ${classes.formColumnSmall}`}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="fechaVacunaGripal"
                label="Fecha de vacunación"
                format="MM/dd/yyyy"
                inputProps={{ name: 'fechaVacunaGripal' }}
                value={formData?.fechaVacunaGripal}
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
          radioValue={formData?.trabajadorSalud}
        />
      </form>
    </Container>
  );
};

const AntEpidemioForm2 = () => {
  const classes = useStyles();

  return (
    <Container>
      <form className={classes.form} noValidate autoComplete="off">
        <div className={classes.formContent}>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
        </div>
        <div className={`${classes.form} ${classes.formContentBlue}`}>
          <h3 style={{ margin: '0.3rem' }}>Residencia del Paciente</h3>
          <div className={classes.formContent}>
            <div className={classes.formColumn}></div>
            <div className={classes.formColumn}></div>
            <div className={classes.formColumn}></div>
          </div>
        </div>
      </form>
    </Container>
  );
};

const AntEpidemioForm3 = () => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
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
    privadoLib: false,
  });
  const handleFormChange = (event) => {
    const name = event.target.name;
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  return (
    <Container>
      <form className={classes.form} noValidate autoComplete="off">
        <div className={classes.formContent}>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
        </div>
        <div className={`${classes.form} ${classes.formContentBlue}`}>
          <h3 style={{ margin: '0.3rem' }}>Residencia del Paciente</h3>
          <div className={classes.formContent}>
            <div className={classes.formColumn}></div>
            <div className={classes.formColumn}></div>
            <div className={classes.formColumn}></div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export { AntEpidemioForm1, AntEpidemioForm2, AntEpidemioForm3 };
