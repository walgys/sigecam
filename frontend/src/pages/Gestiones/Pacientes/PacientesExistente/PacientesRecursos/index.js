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
    padding: '1%',
    maxWidth: '200px',
    minWidth: '100px',
    minHeight: '80px',
    flexDirection: 'column',
    justifyContent: 'center',
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  const recursos = useSelector(
    (state) => state.recursosPaciente.selectedPaciente.recursos
  );

  const [showModal, setShowModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);

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

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalAdd = () => {};

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const iconByResourceType = [{ tipo: 1, icon: `fas fa-procedures` }];

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

  return (
    <>
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalAdd()}
        open={showModal}
        title={'Asignar nuevo recurso'}
      >
        <div className={classes.root}>
          <FormControl className={`${classes.formControl} ${classes.field}`}>
            <InputLabel id="paciente-label">Tipo de Recurso</InputLabel>
            <NativeSelect
              labelId="paciente-label"
              inputProps={{ tabIndex: '10', name: 'paciente' }}
              id="paciente"
              value={pacientes?.selectedPacient}
              onChange={(e) => {
                dispatch(onSelectPaciente(e.target.id));
              }}
            >
              <option aria-label="None" value="0" />
              {pacientes?.map((p) => (
                <option key={`${p.id}-${p.nombre}`} value={p.id}>
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
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                  <Tab label="Item Four" {...a11yProps(3)} />
                  <Tab label="Item Five" {...a11yProps(4)} />
                  <Tab label="Item Six" {...a11yProps(5)} />
                  <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
              </AppBar>
              <TabPanel value={tabValue} index={0}>
                {recursos?.map((ab, idx) => (
                  <Card className={`${classes.root} ${classes.card}`}>
                    <RecursoIcon
                      propClases={`${classes.iconSm}`}
                      tipo={ab.tipo}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
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
                  </Card>
                ))}
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {recursos?.map((ab, idx) => (
                  <Card className={`${classes.root} ${classes.card}`}>
                    <RecursoIcon
                      propClases={`${classes.iconSm}`}
                      tipo={ab.tipo}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
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
                  </Card>
                ))}
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                Item Four
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                Item Five
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                Item Six
              </TabPanel>
              <TabPanel value={tabValue} index={6}>
                Item Seven
              </TabPanel>
            </div>
          </div>
        </div>
      </DialogModal>
      <div className={`${classes.root} `}>
        <FormControl className={`${classes.formControl}`}>
          <InputLabel id="paciente-label">Paciente</InputLabel>
          <NativeSelect
            labelId="paciente-label"
            inputProps={{ tabIndex: '10', name: 'paciente' }}
            id="paciente"
            value={pacientes?.selectedPacient}
            onChange={(e) => {
              dispatch(onSelectPaciente(e.target.value));
              dispatch(getRecursosPaciente(e.target.value));
            }}
          >
            <option aria-label="None" value="0" />
            {pacientes?.map((p) => (
              <option key={`${p.id}-${p.nombre}`} value={p.id}>
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
          {recursos?.map((ab, idx) => (
            <Card className={`${classes.root} ${classes.card}`}>
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
