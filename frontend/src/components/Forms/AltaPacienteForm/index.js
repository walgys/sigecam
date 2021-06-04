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
  field: {
    height: '80px',
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
    margin: 0,
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
              className={classes.field}
              required
              id="nombre-required"
              inputProps={{ name: 'nombre' }}
              label="Nombres del Paciente"
              variant="outlined"
              value={formData?.nombre?.value}
              error={formData?.nombre?.error}
              helperText={
                formData?.nombre?.error ? formData?.nombre?.errorText : ''
              }
              onChange={(e) =>
                dispatch(
                  onAltaChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
            <FormControl className={`${classes.formControl} ${classes.field}`}>
              <InputLabel id="edad-label">Edad</InputLabel>
              <NativeSelect
                labelId="edad-label"
                inputProps={{ name: 'edad' }}
                id="edad"
                value={formData?.edad.value}
                error={formData?.edad.error}
                helperText={
                  formData?.edad?.error ? formData?.edad?.errorText : ''
                }
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
              className={classes.field}
              required
              id="apellido-required"
              name="apellido"
              label="Apellidos del Paciente"
              variant="outlined"
              value={formData?.apellido.value}
              error={formData?.apellido.error}
              helperText={
                formData?.apellido?.error ? formData?.apellido?.errorText : ''
              }
              onChange={(e) =>
                dispatch(
                  onAltaChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="tipoDoc-label">Tipo Doc</InputLabel>
              <NativeSelect
                labelId="tipoDoc-label"
                inputProps={{ name: 'tipoDoc' }}
                id="tipoDoc"
                value={formData?.tipoDoc.value}
                error={formData?.tipoDoc.error}
                helperText={
                  formData?.tipoDoc?.error ? formData?.tipoDoc?.errorText : ''
                }
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
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <NativeSelect
                labelId="sexo-label"
                inputProps={{ name: 'sexo' }}
                id="sexo"
                value={formData?.sexo.value}
                error={formData?.sexo.error}
                helperText={
                  formData?.sexo?.error ? formData?.sexo?.errorText : ''
                }
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
              className={classes.field}
              required
              id="numeroDoc-required"
              name="numeroDoc"
              label="Nro Documento"
              variant="outlined"
              value={formData?.numeroDoc.value}
              error={formData?.numeroDoc.error}
              helperText={
                formData?.numeroDoc?.error ? formData?.numeroDoc?.errorText : ''
              }
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
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="nacionalidad-label">Nacionalidad</InputLabel>
              <NativeSelect
                labelId="nacionalidad-label"
                inputProps={{ name: 'nacionalidad' }}
                id="nacionalidad"
                value={formData?.nacionalidad.value}
                error={formData?.nacionalidad.error}
                helperText={
                  formData?.nacionalidad?.error
                    ? formData?.nombre?.errorText
                    : ''
                }
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
              <FormControl
                className={`${classes.formControl} ${classes.field} `}
              >
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <NativeSelect
                  labelId="provincia-label"
                  inputProps={{ name: 'provincia' }}
                  id="provincia"
                  value={formData?.provincia.value}
                  error={formData?.provincia.error}
                  helperText={
                    formData?.provincia?.error
                      ? formData?.provincia?.errorText
                      : ''
                  }
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
              <FormControl
                className={`${classes.formControl} ${classes.field}`}
              >
                <InputLabel id="localidad-label">Localidad</InputLabel>
                <NativeSelect
                  labelId="localidad-label"
                  inputProps={{ name: 'localidad' }}
                  id="localidad"
                  error={formData?.localidad.error}
                  value={formData?.localidad.value}
                  helperText={
                    formData?.localidad?.error
                      ? formData?.localidad?.errorText
                      : ''
                  }
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
                className={classes.field}
                required
                id="domCP-required"
                name="domCP"
                label="Código Postal"
                variant="outlined"
                value={formData?.domCP.value}
                error={formData?.domCP.error}
                helperText={
                  formData?.domCP?.error ? formData?.domCP?.errorText : ''
                }
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
                className={classes.field}
                required
                id="domicilio-required"
                name="domicilio"
                label="Domicilio"
                variant="outlined"
                value={formData?.domicilio.value}
                error={formData?.domicilio.error}
                helperText={
                  formData?.domicilio?.error
                    ? formData?.domicilio?.errorText
                    : ''
                }
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
                className={classes.field}
                required
                id="nroDom-required"
                label="Número"
                name="nroDom"
                variant="outlined"
                value={formData?.nroDom.value}
                error={formData?.nroDom.error}
                helperText={
                  formData?.nroDom?.error ? formData?.nroDom?.errorText : ''
                }
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
                className={classes.field}
                required
                id="domPiso-required"
                label="Piso"
                name="domPiso"
                variant="outlined"
                value={formData?.domPiso.value}
                error={formData?.domPiso.error}
                helperText={
                  formData?.domPiso?.error ? formData?.domPiso?.errorText : ''
                }
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
                className={classes.field}
                required
                name="domDto"
                id="domDto-required"
                label="Dto."
                variant="outlined"
                value={formData?.domDto.value}
                error={formData?.domDto.error}
                helperText={
                  formData?.domDto?.error ? formData?.domDto?.errorText : ''
                }
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
                className={classes.field}
                required
                id="domBarrio-required"
                name="domBarrio"
                label="Barrio / Villa"
                variant="outlined"
                value={formData?.domBarrio.value}
                error={formData?.domBarrio.error}
                helperText={
                  formData?.domBarrio?.error
                    ? formData?.domBarrio?.errorText
                    : ''
                }
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
