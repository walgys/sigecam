import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAltaChange, getFormOptionsLocalidades } from 'redux/Forms';
import { makeStyles } from '@material-ui/core/styles';

import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  NativeSelect,
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

const AltaPacienteForm = () => {
  const classes = useStyles();
  const provincias = useSelector((state) => state.forms.formOptions.provincias);
  const localidades =
    useSelector((state) => state.forms.formOptions.localidades) || [];
  const localidadesStatus = useSelector(
    (state) => state.forms.formOptions.localidadesStatus
  );
  const formData = useSelector((state) => state.forms.altaPaciente);
  const provincia = useSelector((state) => state.forms.altaPaciente.provincia);

  const dispatch = useDispatch();
  useEffect(() => {
    if (provincia !== '' && localidadesStatus === 'ready')
      dispatch(getFormOptionsLocalidades(provincia));
    return () => {};
  }, [provincia]);

  return (
    <Container>
      <form className={classes.form} noValidate autoComplete="off">
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <TextField
              required
              id="nombre-required"
              inputProps={{ name: 'nombre' }}
              label="Nombres del Paciente"
              variant="outlined"
              value={formData?.nombre}
              onChange={(e) =>
                dispatch(
                  onAltaChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="edad-label">Edad</InputLabel>
              <NativeSelect
                labelId="edad-label"
                inputProps={{ name: 'edad' }}
                id="edad"
                value={formData?.edad}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="" />
                {[...Array(140).keys()].map((k) => (
                  <option key={`edad-${k}`} value={k + 1}>
                    {k + 1}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <TextField
              required
              id="apellido-required"
              name="apellido"
              label="Apellidos del Paciente"
              variant="outlined"
              value={formData?.apellido}
              onChange={(e) =>
                dispatch(
                  onAltaChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="tipoDoc-label">Tipo Doc</InputLabel>
              <NativeSelect
                labelId="tipoDoc-label"
                inputProps={{ name: 'tipoDoc' }}
                id="tipoDoc"
                value={formData?.tipoDoc}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="" />
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <FormControl className={classes.formControl}>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <NativeSelect
                labelId="sexo-label"
                inputProps={{ name: 'sexo' }}
                id="sexo"
                value={formData?.sexo}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
            <TextField
              required
              id="numeroDoc-required"
              name="numeroDoc"
              label="Nro Documento"
              variant="outlined"
              value={formData?.numeroDoc}
              onChange={(e) =>
                dispatch(
                  onAltaChange({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>
        </div>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <FormControl className={classes.formControl}>
              <InputLabel id="nacionalidad-label">Nacionalidad</InputLabel>
              <NativeSelect
                labelId="nacionalidad-label"
                inputProps={{ name: 'nacionalidad' }}
                id="nacionalidad"
                value={formData?.nacionalidad}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
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
                <NativeSelect
                  labelId="provincia-label"
                  inputProps={{ name: 'provincia' }}
                  id="provincia"
                  value={formData?.provincia}
                  onChange={(e) =>
                    dispatch(
                      onAltaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option aria-label="None" value="" />
                  {provincias.map((p) => (
                    <option key={`${p.id}-${p.nombre}`} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </div>
            <div className={classes.formColumn}>
              <FormControl className={classes.formControl}>
                <InputLabel id="localidad-label">Localidad</InputLabel>
                <NativeSelect
                  labelId="localidad-label"
                  inputProps={{ name: 'localidad' }}
                  id="localidad"
                  value={formData?.localidad}
                  onChange={(e) =>
                    dispatch(
                      onAltaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option aria-label="None" value="" />
                  {localidades.map((p) => (
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
                id="domCP-required"
                name="domCP"
                label="Código Postal"
                variant="outlined"
                value={formData?.domCP}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
          </div>
          <div className={classes.formContent}>
            <div className={classes.formColumn}>
              <TextField
                required
                id="domicilio-required"
                name="domicilio"
                label="Domicilio"
                variant="outlined"
                value={formData?.domicilio}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className={classes.formColumn}>
              <TextField
                required
                id="nroDom-required"
                label="Número"
                name="nroDom"
                variant="outlined"
                value={formData?.nroDom}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className={classes.formColumn} style={{ flex: '8%' }}>
              <TextField
                required
                id="domPiso-required"
                label="Piso"
                nombre="domPiso"
                variant="outlined"
                value={formData?.domPiso}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className={classes.formColumn} style={{ flex: '8%' }}>
              <TextField
                required
                id="domDto-required"
                label="Dto."
                variant="outlined"
              />
            </div>
          </div>
          <div className={classes.formContent}>
            <div className={classes.formColumn} style={{ flex: '59%' }}>
              <TextField
                required
                id="domDto-required"
                name="domDto"
                label="Dto."
                variant="outlined"
                value={formData?.domDto}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className={classes.formColumn}>
              <FormControlLabel
                style={{ justifyContent: 'center' }}
                control={
                  <Checkbox
                    checked={formData?.privadoLib}
                    onChange={(e) =>
                      dispatch(
                        onAltaChange({
                          name: e.target.name,
                          value: e.target.checked,
                        })
                      )
                    }
                    name="privadoLib"
                    color="primary"
                  />
                }
                label="Privado de su Libertad"
              />
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default AltaPacienteForm;
