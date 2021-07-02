import React, { useEffect, useCallback } from 'react';
import { loadCSS } from 'fg-loadcss';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  getListaPacientes,
  onSelectPaciente,
} from 'redux/GestionPacientes/RecursosPaciente';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Icon,
  InputLabel,
  NativeSelect,
  Typography,
} from '@material-ui/core';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    border: '1px solid black',
    borderRadius: '15px',
    width: '-webkit-fill-available',
    padding: '1%',
    flexWrap: 'wrap',
  },
  footer: {
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '1%',
    width: '-webkit-fill-available',
  },
  field: {
    height: '80px',
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

const iconByResourceType = [
  { tipo: 1, icon: <Icon className="fas fa-procedures" /> },
];

const RecursoIcon = (props) => {
  const { tipo } = props;
  return iconByResourceType.filter((i) => tipo === i.tipo)[0].icon;
};

const PacientesRecursos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const pacientes = useSelector((state) => state.recursosPaciente.pacientes);
  const recursos = useSelector(
    (state) => state.recursosPaciente.selectedPaciente.recursos
  );

  const getPacientes = useCallback(() => {
    dispatch(getListaPacientes({ idInstitucion: userData?.idInstitucion }));
  }, [pacientes, userData]);

  useEffect(() => {
    getPacientes();
  }, [dispatch]);

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

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

      <div className={classes.action}>
        {recursos?.map((ab, idx) => (
          <Card className={classes.root}>
            <RecursoIcon tipo={ab.tipo} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {ab.nombre}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {ab.descripcion}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={() => console.log('click')}
        >
          <AddIcon />
        </Fab>
      </div>
      <div className={classes.footer}>
        <Button variant="contained" color="primary">
          Volver atrás
        </Button>
      </div>
    </div>
  );
};

export default PacientesRecursos;
