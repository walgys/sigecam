import React, { useEffect, useCallback } from 'react';
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
  const formData = useSelector((state) => state.forms.altaPaciente);
  const provincia = useSelector(
    (state) => state.forms.altaPaciente.provincia.value
  );

  const dispatch = useDispatch();
  const getLocalidades = useCallback(() => {
    if (provincia !== '0' && provincia !== null)
      dispatch(getFormOptionsLocalidades(provincia));
  }, [provincia, dispatch]);

  useEffect(() => {
    getLocalidades();
    return () => {};
  }, [getLocalidades]);

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
              value={formData?.nombre?.value}
              error={formData?.nombre?.error}
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
                value={formData?.edad.value}
                error={formData?.edad.error}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="0" />
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
              value={formData?.apellido.value}
              error={formData?.apellido.error}
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
                value={formData?.tipoDoc.value}
                error={formData?.tipoDoc.error}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="0" />
                <option value={1}>DNI</option>
                <option value={2}>Pasaporte</option>
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
                value={formData?.sexo.value}
                error={formData?.sexo.error}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="0" />
                <option value={1}>Masculino</option>
                <option value={2}>Femenino</option>
                <option value={3}>Otro</option>
              </NativeSelect>
            </FormControl>
            <TextField
              required
              id="numeroDoc-required"
              name="numeroDoc"
              label="Nro Documento"
              variant="outlined"
              value={formData?.numeroDoc.value}
              error={formData?.numeroDoc.error}
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
                value={formData?.nacionalidad.value}
                error={formData?.nacionalidad.error}
                onChange={(e) =>
                  dispatch(
                    onAltaChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                <option aria-label="None" value="0" />
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
                  value={formData?.provincia.value}
                  error={formData?.provincia.error}
                  onChange={(e) =>
                    dispatch(
                      onAltaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
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
              <FormControl className={classes.formControl}>
                <InputLabel id="localidad-label">Localidad</InputLabel>
                <NativeSelect
                  labelId="localidad-label"
                  inputProps={{ name: 'localidad' }}
                  id="localidad"
                  error={formData?.localidad.error}
                  value={formData?.localidad.value}
                  onChange={(e) =>
                    dispatch(
                      onAltaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option aria-label="None" value="0" />
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
                value={formData?.domCP.value}
                error={formData?.domCP.error}
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
                value={formData?.domicilio.value}
                error={formData?.domicilio.error}
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
            <div className={classes.formColumn.value}>
              <TextField
                required
                id="nroDom-required"
                label="Número"
                name="nroDom"
                variant="outlined"
                value={formData?.nroDom.value}
                error={formData?.nroDom.error}
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
                name="domPiso"
                variant="outlined"
                value={formData?.domPiso.value}
                error={formData?.domPiso.error}
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
                name="domDto"
                id="domDto-required"
                label="Dto."
                variant="outlined"
                value={formData?.domDto.value}
                error={formData?.domDto.error}
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
            <div className={classes.formColumn} style={{ flex: '59%' }}>
              <TextField
                required
                id="domBarrio-required"
                name="domBarrio"
                label="Barrio / Villa"
                variant="outlined"
                value={formData?.domBarrio.value}
                error={formData?.domBarrio.error}
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
                    checked={formData?.privadoLib.value}
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
