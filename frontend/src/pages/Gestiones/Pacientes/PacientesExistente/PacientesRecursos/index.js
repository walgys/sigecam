import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  getListaPacientes,
  onSelectPaciente,
} from 'redux/GestionPacientes/RecursosPaciente';
import { FormControl, InputLabel, NativeSelect } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
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
    width: '100%',
    maxWidth: 500,
    margin: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PacientesRecursos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const pacientes = useSelector((state) => state.recursosPaciente.pacientes);
  const getPacientes = useCallback(() => {
    dispatch(getListaPacientes({ idInstitucion: userData?.idInstitucion }));
  }, [pacientes, userData]);
  useEffect(() => {
    getPacientes();
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <FormControl className={`${classes.formControl} ${classes.field}`}>
        <InputLabel id="paciente-label">Paciente</InputLabel>
        <NativeSelect
          labelId="paciente-label"
          inputProps={{ tabIndex: '10', name: 'paciente' }}
          id="paciente"
          value={pacientes?.selectedPacient}
          onChange={(e) => dispatch(onSelectPaciente(e.target.id))}
        >
          <option aria-label="None" value="0" />
          {pacientes?.map((p) => (
            <option key={`${p.id}-${p.nombre}`} value={p.id}>
              {`${p.id.toString().padStart(5, '0')} - ${
                p.nombre[0].toUpperCase() + p.nombre.substring(1).toLowerCase()
              } ${
                p.apellido[0].toUpperCase() +
                p.apellido.substring(1).toLowerCase()
              }`}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <div></div>
    </div>
  );
};

export default PacientesRecursos;
