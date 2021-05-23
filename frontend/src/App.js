import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateSession } from './redux/user';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import * as pages from './pages/index';

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
  PacientesDatos: <pages.PacientesDatos />,
  PacientesDatosExistente: <pages.PacientesDatosExistente />,
  PacientesDatosNuevo: <pages.PacientesDatosNuevo />,
  PacientesEstado: <pages.PacientesEstado />,
  PacientesBaja: <pages.PacientesBaja />,
  Estadistica: <pages.Estadisticas />,
  EstadisticasTotal: <pages.EstadisticasTotal />,
  EstadisticasNacional: <pages.EstadisticasNacional />,
  EstadisticasProvincial: <pages.EstadisticasProvincial />,
  EstadisticasRegional: <pages.EstadisticasRegional />,
  EstadisticasInstitucion: <pages.EstadisticasInstitucion />,
  Mapa: <pages.Mapa />,
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const accessByUserType = useSelector(
    (state) => state.constants.accessByUserType
  );
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
      {allowedRoutes?.map((ar) => (
        <Route key={ar.route} exact path={ar.route}>
          {pageComponentMap[ar.page]}
        </Route>
      ))}
    </Switch>
  );

  useEffect(() => {
    if (sessionChecked === false) dispatch(validateSession());
    return () => {
      //cleanup
    };
  }, [dispatch, sessionChecked]);

  return (
    <div className="App">
      <Router>
        <NavBar isAuth={isAuth} />
        {sessionChecked ? routingLogic : 'loading...'}
      </Router>
    </div>
  );
};

export default App;
