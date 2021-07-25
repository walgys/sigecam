import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onAltaChange,
  getDatosFormularios,
  getDatosPaciente,
} from 'redux/GestionPacientes/Forms';
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
  pacientCmbo: {
    minWidth: '250px',
  },
}));

const AltaPacienteForm = (props) => {
  const { tipoPaciente } = props;
  const classes = useStyles();
  const userData = useSelector((state) => state.user.userData);
  const provincias = useSelector((state) => state.forms.formOptions.provincias);
  const nacionalidades = useSelector(
    (state) => state.forms.formOptions.nacionalidades
  );
  const sexo = useSelector((state) => state.forms.formOptions.sexo);
  const tipoDoc = useSelector((state) => state.forms.formOptions.tipoDoc);
  const localidades = useSelector(
    (state) => state.forms.formOptions.localidades
  ) || [{ localidades: [] }];
  const formData = useSelector((state) => state.forms.altaPaciente);
  const provincia = useSelector(
    (state) => state.forms.altaPaciente.provincia.value
  );
  const listaPacientes = useSelector(
    (state) => state.forms.formOptions.listaPacientes
  );

  const [selectedPaciente, setSelectedPaciente] = useState(0);

  const localidadesFiltradas = localidades.filter(
    (l) => l.id === parseInt(provincia, 0)
  )[0];

  const dispatch = useDispatch();

  const getProvincias = useCallback(() => {
    dispatch(
      getDatosFormularios({
        tipoPaciente: tipoPaciente,
        idInstitucion: userData?.idInstitucion,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    getProvincias();
    return () => {};
  }, [getProvincias]);

  return (
    <Container>
      {tipoPaciente === 'existente' && (
        <FormControl
          className={`${classes.formControl} ${classes.pacientCmbo}`}
        >
          <InputLabel id="edad-label">Paciente</InputLabel>
          <NativeSelect
            labelId="edad-label"
            inputProps={{ tabIndex: '0', name: 'edad' }}
            id="edad"
            value={selectedPaciente}
            onChange={(e) =>
              dispatch(getDatosPaciente({ idPaciente: e.target.value }))
            }
          >
            <option aria-label="None" value="0" />
            {listaPacientes?.map((k) => (
              <option key={k.id} value={k.id}>
                {`${k.nombre} ${k.apellido}`}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      )}
      <form className={classes.form} noValidate>
        <div className={classes.formContent}>
          <div className={classes.formColumn}>
            <TextField
              className={classes.field}
              required
              id="nombre-required"
              inputProps={{ tabIndex: '1', name: 'nombre' }}
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
                inputProps={{ tabIndex: '4', name: 'edad' }}
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
              inputProps={{ tabIndex: '2', name: 'apellido' }}
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
                inputProps={{ tabIndex: '5', name: 'tipoDoc' }}
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
                {tipoDoc?.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.formColumn}>
            <FormControl className={`${classes.formControl} ${classes.field} `}>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <NativeSelect
                labelId="sexo-label"
                inputProps={{ tabIndex: '3', name: 'sexo' }}
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
                {sexo?.map((p) => (
                  <option key={`${p.id}-${p.nombre}`} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <TextField
              className={classes.field}
              required
              id="nroDoc-required"
              inputProps={{ tabIndex: '6' }}
              name="nroDoc"
              label="Nro Documento"
              variant="outlined"
              value={formData?.nroDoc.value}
              error={formData?.nroDoc.error}
              helperText={
                formData?.nroDoc?.error ? formData?.nroDoc?.errorText : ''
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
                inputProps={{ tabIndex: '7', name: 'nacionalidad' }}
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
                {nacionalidades?.map((p) => (
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
              id="telefono-required"
              inputProps={{ tabIndex: '8' }}
              name="telefono"
              label="Número de teléfono"
              variant="outlined"
              value={formData?.telefono.value}
              error={formData?.telefono.error}
              helperText={
                formData?.telefono?.error ? formData?.telefono?.errorText : ''
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
                  inputProps={{ tabIndex: '9', name: 'provincia' }}
                  id="provincia"
                  value={formData?.provincia.value}
                  error={formData?.provincia.error}
                  helperText={
                    formData?.provincia?.error
                      ? formData?.provincia?.errorText
                      : ''
                  }
                  onChange={(e) => {
                    dispatch(
                      onAltaChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    );
                  }}
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
                  inputProps={{ tabIndex: '10', name: 'localidad' }}
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
                  {localidadesFiltradas?.localidades.map((p) => (
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
                id="codPos-required"
                inputProps={{ tabIndex: '11' }}
                name="codPos"
                label="Código Postal"
                variant="outlined"
                value={formData?.codPos.value}
                error={formData?.codPos.error}
                helperText={
                  formData?.codPos?.error ? formData?.codPos?.errorText : ''
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
                id="calle-required"
                inputProps={{ tabIndex: '12' }}
                name="calle"
                label="Domicilio"
                variant="outlined"
                value={formData?.calle.value}
                error={formData?.calle.error}
                helperText={
                  formData?.calle?.error ? formData?.calle?.errorText : ''
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
                id="nroCalle-required"
                label="Número"
                inputProps={{ tabIndex: '13' }}
                name="nroCalle"
                variant="outlined"
                value={formData?.nroCalle.value}
                error={formData?.nroCalle.error}
                helperText={
                  formData?.nroCalle?.error ? formData?.nroCalle?.errorText : ''
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
                id="piso-required"
                label="Piso"
                inputProps={{ tabIndex: '14' }}
                name="piso"
                variant="outlined"
                value={formData?.piso.value}
                error={formData?.piso.error}
                helperText={
                  formData?.piso?.error ? formData?.piso?.errorText : ''
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
                name="depto"
                id="depto-required"
                label="Dto."
                inputProps={{ tabIndex: '15' }}
                variant="outlined"
                value={formData?.depto.value}
                error={formData?.depto.error}
                helperText={
                  formData?.depto?.error ? formData?.depto?.errorText : ''
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
                id="barrioVilla-required"
                name="barrioVilla"
                label="Barrio / Villa"
                variant="outlined"
                inputProps={{ tabIndex: '16' }}
                value={formData?.barrioVilla.value}
                error={formData?.barrioVilla.error}
                helperText={
                  formData?.barrioVilla?.error
                    ? formData?.barrioVilla?.errorText
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
                    inputProps={{ tabIndex: '17' }}
                    checked={formData?.privadoLibertad.value}
                    onChange={(e) =>
                      dispatch(
                        onAltaChange({
                          name: e.target.name,
                          value: e.target.checked,
                        })
                      )
                    }
                    name="privadoLibertad"
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
