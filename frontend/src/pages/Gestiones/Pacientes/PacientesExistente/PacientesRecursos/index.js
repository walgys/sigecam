import React, { useEffect, useCallback, useState } from 'react';
import { loadCSS } from 'fg-loadcss';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  getListaPacientes,
  getRecursosPaciente,
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
  AppBar,
  Tabs,
  Tab,
  Box,
  CardActionArea,
  Badge,
} from '@material-ui/core';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogModal from 'components/DialogModal';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tabRoot: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: '200px',
    minWidth: '100px',
    minHeight: '80px',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardAction: {
    padding: '1%',
    height: '100%',
  },
  button: {
    maxWidth: '200px',
    minWidth: '100px',
    minHeight: '80px',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconSm: { fontSize: '2rem' },
  iconMd: { fontSize: '3rem' },
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
  modalAction: {
    height: '300px',
    display: 'flex',
    alignItems: 'flex-start',
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const PacientesRecursos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const pacientes = useSelector((state) => state.recursosPaciente.pacientes);

  const selectedPaciente = useSelector(
    (state) => state.recursosPaciente.selectedPaciente
  );

  const [showModal, setShowModal] = useState(false);

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

  const iconByResourceType = [
    { tipo: 1, icon: `fas fa-procedures` },
    { tipo: 2, icon: `fas fa-procedures` },
    { tipo: 3, icon: `fas fa-procedures` },
  ];

  const RecursoIcon = (props) => {
    const { tipo, propClases } = props;
    return (
      <Icon
        className={`${
          iconByResourceType.filter((i) => tipo === i.tipo)[0].icon
        }  ${propClases}`}
      />
    );
  };

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -2,
      top: 10,
      width: '2rem',
      height: '2rem',
      fontSize: '1rem',
      borderRadius: '50%',
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  const AddResourceDialog = () => {
    const [selectedTipoRecurso, setSelectedTipoRecurso] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const tiposRecurso = useSelector(
      (state) => state.recursosPaciente.tiposRecurso
    );
    const ubicacionesInstitucion = useSelector(
      (state) => state.recursosPaciente.ubicacionesInstitucion
    );

    const recursosInstitucion = useSelector(
      (state) => state.recursosPaciente.recursosInstitucion
    );

    const recursosInstitucionFiltered = recursosInstitucion.filter(
      (ri) => selectedPaciente.recursos.filter((r) => r.id == ri.id).length == 0
    );

    const handleModalAdd = () => {};

    const handleModalClose = () => {
      setShowModal(false);
    };

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };

    return (
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalAdd()}
        open={showModal}
        title={'Asignar nuevo recurso'}
        titleWidth={'60vw'}
      >
        <div className={classes.root}>
          <FormControl className={`${classes.formControl} ${classes.field}`}>
            <InputLabel id="tipoRecurso-label">Tipo de Recurso</InputLabel>
            <NativeSelect
              labelId="tipoRecurso-label"
              inputProps={{ tabIndex: '10', name: 'tipoRecurso' }}
              id="tipoRecurso"
              value={selectedTipoRecurso}
              onChange={(e) => {
                setSelectedTipoRecurso(e.target.value);
              }}
            >
              <option aria-label="None" value="0" />
              {tiposRecurso?.map((p) => (
                <option key={`${p.id}-${p.nombre}`} value={p.id}>
                  {`${p.nombre}`}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          <div className={classes.modalAction}>
            <div className={classes.tabRoot}>
              <AppBar position="static" color="default">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {ubicacionesInstitucion?.map((u, idx) => (
                    <Tab
                      key={`${idx}-ubi-${u.nombre}`}
                      label={u.nombre}
                      {...a11yProps(idx)}
                    />
                  ))}
                </Tabs>
              </AppBar>
              {ubicacionesInstitucion?.map((u, idx) => (
                <TabPanel
                  key={`${idx}-tp-${u.nombre}`}
                  value={tabValue}
                  index={idx}
                >
                  {recursosInstitucionFiltered
                    ?.filter((r) => {
                      return (
                        r.tipo == selectedTipoRecurso && r.ubicacion == u.id
                      );
                    })
                    .map((ab, idx) => (
                      <Card
                        key={`${idx}-card-${u.nombre}-${ab.nombre}`}
                        className={`${classes.root} ${classes.card}`}
                      >
                        <CardActionArea className={classes.cardAction}>
                          <RecursoIcon
                            propClases={`${classes.iconSm}`}
                            tipo={ab.tipo}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {ab.nombre}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {ab.descripcion}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                </TabPanel>
              ))}
            </div>
          </div>
        </div>
      </DialogModal>
    );
  };

  return (
    <>
      <AddResourceDialog />
      <div className={`${classes.root} `}>
        <FormControl className={`${classes.formControl}`}>
          <InputLabel id="paciente-label">Paciente</InputLabel>
          <NativeSelect
            labelId="paciente-label"
            inputProps={{ tabIndex: '10', name: 'paciente' }}
            id="paciente"
            value={selectedPaciente?.id}
            onChange={(e) => {
              dispatch(onSelectPaciente(e.target.value));

              dispatch(
                getRecursosPaciente({
                  idPaciente: e.target.value,
                  idInstitucion:
                    e.target.selectedOptions[0].getAttribute('idinstitucion'),
                })
              );
            }}
          >
            <option aria-label="None" value="0" />
            {pacientes?.map((p) => (
              <option
                key={`${p.id}-${p.nombre}`}
                value={p.id}
                idinstitucion={p.idInstitucion}
              >
                {`${p.id.toString().padStart(5, '0')} - ${
                  p.nombre[0].toUpperCase() +
                  p.nombre.substring(1).toLowerCase()
                } ${
                  p.apellido[0].toUpperCase() +
                  p.apellido.substring(1).toLowerCase()
                }`}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        <div className={classes.action}>
          {selectedPaciente.recursos?.map((ab, idx) => (
            <Card
              key={`${idx}-res-${ab.nombre}`}
              className={`${classes.root} ${classes.card}`}
            >
              <RecursoIcon propClases={`${classes.iconSm}`} tipo={ab.tipo} />
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
            onClick={() => setShowModal(true)}
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
    </>
  );
};

export default PacientesRecursos;
