import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validarSesion } from './redux/user';
import { setOpenSnack, setSnack } from 'redux/variables';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import * as pages from './pages/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const pageComponentMap = {
  Gestiones: <pages.Gestiones />,
  GestGrupos: <pages.GestGrupos />,
  GestUsuarios: <pages.GestUsuarios />,
  GestInstituciones: <pages.GestInstituciones />,
  GestRecursos: <pages.GestRecursos />,
  GestRecInstituciones: <pages.GestRecInstituciones />,
  GestRecGenerales: <pages.GestRecGenerales />,
  Pacientes: <pages.Pacientes />,
  PacientesRecursos: <pages.PacientesRecursos />,
  PacientesDatosExistente: <pages.PacientesDatosExistente />,
  PacientesDatosNuevo: <pages.PacientesDatosNuevo />,
  PacientesEstado: <pages.PacientesEstado />,
  Estadistica: <pages.Estadisticas />,
  EstadisticasTotal: <pages.EstadisticasTotal />,
  EstadisticasNacional: <pages.EstadisticasNacional />,
  EstadisticasProvincial: <pages.EstadisticasProvincial />,
  EstadisticasRegional: <pages.EstadisticasRegional />,
  EstadisticasInstitucion: <pages.EstadisticasInstitucion />,
  Mapa: <pages.Mapa />,
  Logs: <pages.Logs />,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const accessByUserType = useSelector(
    (state) => state.constants.accessByUserType
  );
  const variables = useSelector((state) => state.variables);
  const { isAuth, sessionChecked } = user;

  const allowedRoutes = accessByUserType?.filter(
    (a) => a.id === user?.userData?.tipoUsuario
  )[0]?.allowedRoutes;

  const routingLogic = (
    <Switch>
      <Route exact path="/">
        {isAuth ? <pages.Home /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        <pages.Login />
      </Route>
      {isAuth ? (
        allowedRoutes?.map((ar) => (
          <Route key={ar.route} exact path={ar.route}>
            {pageComponentMap[ar.page]}
          </Route>
        ))
      ) : (
        <Route>
          <Redirect to="/login" />
        </Route>
      )}
    </Switch>
  );

  const handleSnackClose = () => {
    dispatch(setOpenSnack(false));
  };

  useEffect(() => {
    if (sessionChecked === false) dispatch(validarSesion());
    return () => {
      //cleanup
    };
  }, [dispatch, sessionChecked]);

  return (
    <div className="App">
      <Snackbar
        open={variables.openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={variables.snack.type}>
          {variables.snack.message}
        </Alert>
      </Snackbar>
      <Router>
        <NavBar isAuth={isAuth} />
        {sessionChecked ? routingLogic : 'loading...'}
      </Router>
    </div>
  );
};

export default App;
