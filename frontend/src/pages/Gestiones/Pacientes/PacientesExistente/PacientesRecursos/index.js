import React, { useEffect, useCallback, useState } from 'react';
import { loadCSS } from 'fg-loadcss';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  getListaPacientes,
  getRecursosPaciente,
  onSelectPaciente,
  updatePaciente,
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
  badge: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    top: '10px',
    right: '10px',
  },

  tabRoot: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    display: 'flex',
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
    const [selectedTipoRecurso, setSelectedTipoRecurso] = useState({
      tipo: 0,
      unoXPersona: 0,
    });
    const [tabValue, setTabValue] = useState(0);

    const [resourcesToAdd, setResourcesToAdd] = useState([]);
    const [recursosInstitucionFiltered, setRecursosInstitucionFiltered] =
      useState([]);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedResource, setSelectedResource] = useState({});

    useEffect(() => {
      console.log(resourcesToAdd);
    }, [resourcesToAdd]);

    const ConfirmDialog = () => {
      const handleConfirmDialogAdd = () => {
        const newResources = resourcesToAdd.filter((r) => {
          if (r.tipo == selectedResource.tipo) {
            setRecursosInstitucionFiltered((prevState) =>
              prevState.map((ri) =>
                ri.id == r.id || ri.id == selectedResource.id
                  ? { ...ri, selected: !ri.selected }
                  : ri
              )
            );
            return false;
          } else {
            return true;
          }
        });

        setResourcesToAdd([...newResources, selectedResource]);

        setShowConfirmDialog(false);
      };

      const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
      };

      return (
        <DialogModal
          onClose={() => handleConfirmDialogClose()}
          onAdd={() => handleConfirmDialogAdd()}
          open={showConfirmDialog}
          title={'Asignar nueva Habitación'}
          titleWidth={'20vw'}
          acceptText="Aceptar"
        >
          <Typography>¿ Está seguro que desea cambiar el recurso ?</Typography>
        </DialogModal>
      );
    };

    const tiposRecurso = useSelector(
      (state) => state.recursosPaciente.tiposRecurso
    );
    const ubicacionesInstitucion = useSelector(
      (state) => state.recursosPaciente.ubicacionesInstitucion
    );

    const recursosInstitucion = useSelector(
      (state) => state.recursosPaciente.recursosInstitucion
    );

    const filterResources = () => {
      const recursosPacienteToAdd = selectedPaciente.recursos.map((r) => ({
        ...r,
        selected: true,
      }));
      const recursosInstitucionToAdd = recursosInstitucion.map((r) => ({
        ...r,
        selected: false,
      }));
      setResourcesToAdd([...recursosPacienteToAdd]);
      setRecursosInstitucionFiltered([
        ...recursosPacienteToAdd,
        ...recursosInstitucionToAdd,
      ]);
    };

    useEffect(() => {
      filterResources();
    }, [recursosInstitucion]);

    const handleModalAdd = () => {
      console.log('add');
      dispatch(
        updatePaciente({
          idPaciente: selectedPaciente.id,
          idInstitucion: selectedPaciente.idInstitucion,
          recursos: resourcesToAdd,
        })
      );
      setShowModal(false);
    };

    const handleModalClose = () => {
      setShowModal(false);
    };

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };

    const onCardClick = (resource) => {
      if (
        resourcesToAdd.filter(
          (r) =>
            r.tipo === resource.tipo && selectedTipoRecurso.unoXPersona == 1
        ).length > 0
      ) {
        if (resourcesToAdd.filter((r) => r.id == resource.id).length == 0) {
          setSelectedResource(resource);
          setShowConfirmDialog(true);
        } else {
          const newResources = resourcesToAdd.filter(
            (r) => r.id != resource.id
          );
          setResourcesToAdd(newResources);
          setRecursosInstitucionFiltered((prevState) =>
            prevState.map((r) =>
              r.id == resource.id ? { ...r, selected: !r.selected } : r
            )
          );
        }
      } else {
        if (resourcesToAdd.filter((r) => r.id == resource.id).length == 0) {
          setResourcesToAdd((prevState) => [...prevState, resource]);
        } else {
          const newResources = resourcesToAdd.filter(
            (r) => r.id != resource.id
          );

          setResourcesToAdd(newResources);
        }
        setRecursosInstitucionFiltered((prevState) =>
          prevState.map((r) =>
            r.id == resource.id ? { ...r, selected: !r.selected } : r
          )
        );
      }
    };

    return (
      <>
        {showConfirmDialog && <ConfirmDialog />}
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
                inputProps={{ tabIndex: '10', name: 'tipoRecurso' }}
                id="tipoRecurso"
                value={selectedTipoRecurso.tipo}
                onChange={(e) => {
                  setSelectedTipoRecurso({
                    tipo: e.target.value,
                    unoXPersona:
                      e.target.selectedOptions[0].getAttribute('unoxpersona'),
                  });
                }}
              >
                <option aria-label="None" value="0" />
                {tiposRecurso?.map((p) => (
                  <option
                    key={`${p.id}-${p.nombre}`}
                    value={p.id}
                    unoxpersona={p.unoXPersona}
                  >
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
                    className={classes.tabPanel}
                    key={`${idx}-tp-${u.nombre}`}
                    value={tabValue}
                    index={idx}
                  >
                    {recursosInstitucionFiltered
                      ?.filter((r) => {
                        return (
                          r.tipo == selectedTipoRecurso.tipo &&
                          r.ubicacion == u.id
                        );
                      })
                      .map((resource, idx) => (
                        <Badge
                          key={`${idx}-card-${u.nombre}-${resource.nombre}`}
                          classes={{
                            badge: classes.badge,
                          }}
                          color="secondary"
                          variant="dot"
                          invisible={!resource.selected}
                        >
                          <Card className={`${classes.root} ${classes.card}`}>
                            <CardActionArea
                              onClick={() => onCardClick(resource)}
                              className={classes.cardAction}
                            >
                              <RecursoIcon
                                propClases={`${classes.iconSm}`}
                                tipo={resource.tipo}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  {resource.nombre}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {resource.descripcion}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Badge>
                      ))}
                  </TabPanel>
                ))}
              </div>
            </div>
          </div>
        </DialogModal>
      </>
    );
  };

  return (
    <>
      {showModal && <AddResourceDialog />}
      <div className={`${classes.root} `}>
        <FormControl className={`${classes.formControl}`}>
          <InputLabel id="paciente-label">Paciente</InputLabel>
          <NativeSelect
            labelId="paciente-label"
            inputProps={{ tabIndex: '10', name: 'paciente' }}
            id="paciente"
            value={selectedPaciente?.id}
            onChange={(e) => {
              dispatch(
                onSelectPaciente({
                  idPaciente: e.target.value,
                  idInstitucion:
                    e.target.selectedOptions[0].getAttribute('idinstitucion'),
                })
              );

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
          
        </div>
      </div>
    </>
  );
};

export default PacientesRecursos;
