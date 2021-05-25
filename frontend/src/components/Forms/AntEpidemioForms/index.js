import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { onClinicaChange, getFormOptionsLocalidades } from 'redux/Forms';
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
    flex: '25%',
    justifyContent: 'center',
    rowGap: '0.5rem',
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
  const formData = useSelector((state) => state.forms.infoClinicaForm);
  const dispatch = useDispatch();
  return (
    <Container>
      <form className={classes.form} noValidate autoComplete="off">
        <h3 style={{ margin: '0.3rem' }}>Información Clínica</h3>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <TextField
              id="fisDate"
              inputProps={{ name: 'fisDate' }}
              label="Nombres del Paciente"
              variant="outlined"
              value={formData?.nombre}
              onChange={(e) =>
                dispatch(
                  onClinicaChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className={classes.formColumn}>
            <FormControl className={classes.formControl}>
              <InputLabel id="edad-label">Edad</InputLabel>
              <Select
                labelId="edad-label"
                name="edad"
                id="edad"
                value={formData.edad}
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
          <TextField
            id="fisDate"
            inputProps={{ name: 'fisDate' }}
            label="Nombres del Paciente"
            variant="outlined"
            value={formData?.nombre}
            onChange={(e) =>
              dispatch(
                onClinicaChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              )
            }
          />
          <FormControl component="fieldset" row>
            <RadioGroup
              aria-label="estadoInternacion"
              name="estadoInternacion"
              value={formData.estadoInternacion}
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
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <h3 style={{ margin: '0.3rem' }}>Signos y Síntomas</h3>
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <h3 style={{ margin: '0.3rem' }}>
              Enfermedades Previas/Comorbilidades
            </h3>
          </div>
        </div>
      </form>
    </Container>
  );
};

const AntEpidemioForm2 = () => {
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
          <div className={classes.formColumn}>
            <TextField
              required
              id="nombre-required"
              label="Nombres del Paciente"
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="edad-label">Edad</InputLabel>
              <Select
                labelId="edad-label"
                name="edad"
                id="edad"
                value={formData.edad}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="apellido-required"
              label="Apellidos del Paciente"
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="tipoDoc-label">Tipo Doc</InputLabel>
              <Select
                labelId="tipoDoc-label"
                name="tipoDoc"
                id="tipoDoc"
                value={formData.tipoDoc}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <FormControl className={classes.formControl}>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                labelId="sexo-label"
                name="sexo"
                id="sexo"
                value={formData.sexo}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="numeroDoc-required"
              label="Nro Documento"
              variant="outlined"
            />
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <FormControl className={classes.formControl}>
              <InputLabel id="nacionalidad-label">Nacionalidad</InputLabel>
              <Select
                labelId="nacionalidad-label"
                name="nacionalidad"
                id="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
        </div>
        <div className={`${classes.form} ${classes.formContentBlue}`}>
          <h3 style={{ margin: '0.3rem' }}>Residencia del Paciente</h3>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <FormControl className={classes.formControl}>
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <Select
                  labelId="provincia-label"
                  name="provincia"
                  id="provincia"
                  value={formData.provincia}
                  onChange={handleFormChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.formColumn}>
              <FormControl className={classes.formControl}>
                <InputLabel id="localidad-label">Localidad</InputLabel>
                <Select
                  labelId="localidad-label"
                  name="localidad"
                  id="localidad"
                  value={formData.localidad}
                  onChange={handleFormChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.formColumn}>
              <TextField
                required
                id="domCP-required"
                label="Código Postal"
                variant="outlined"
              />
            </div>
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
          <div className={classes.formColumn}>
            <TextField
              required
              id="nombre-required"
              label="Nombres del Paciente"
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="edad-label">Edad</InputLabel>
              <Select
                labelId="edad-label"
                name="edad"
                id="edad"
                value={formData.edad}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="apellido-required"
              label="Apellidos del Paciente"
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="tipoDoc-label">Tipo Doc</InputLabel>
              <Select
                labelId="tipoDoc-label"
                name="tipoDoc"
                id="tipoDoc"
                value={formData.tipoDoc}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <FormControl className={classes.formControl}>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                labelId="sexo-label"
                name="sexo"
                id="sexo"
                value={formData.sexo}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="numeroDoc-required"
              label="Nro Documento"
              variant="outlined"
            />
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <FormControl className={classes.formControl}>
              <InputLabel id="nacionalidad-label">Nacionalidad</InputLabel>
              <Select
                labelId="nacionalidad-label"
                name="nacionalidad"
                id="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleFormChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.formColumn}></div>
          <div className={classes.formColumn}></div>
        </div>
        <div className={`${classes.form} ${classes.formContentBlue}`}>
          <h3 style={{ margin: '0.3rem' }}>Residencia del Paciente</h3>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <FormControl className={classes.formControl}>
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <Select
                  labelId="provincia-label"
                  name="provincia"
                  id="provincia"
                  value={formData.provincia}
                  onChange={handleFormChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.formColumn}>
              <FormControl className={classes.formControl}>
                <InputLabel id="localidad-label">Localidad</InputLabel>
                <Select
                  labelId="localidad-label"
                  name="localidad"
                  id="localidad"
                  value={formData.localidad}
                  onChange={handleFormChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.formColumn}>
              <TextField
                required
                id="domCP-required"
                label="Código Postal"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export { AntEpidemioForm1, AntEpidemioForm2, AntEpidemioForm3 };
