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
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Gestiones from './pages/Gestiones';
import Estadisticas from './pages/Estadisticas';
import Mapa from './pages/Mapa';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isAuth, sessionChecked } = user;
  const routingLogic = (
    <Switch>
      <Route exact path="/">
        {isAuth ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/gestiones">
        <Gestiones />
      </Route>
      <Route exact path="/estadisticas">
        <Estadisticas />
      </Route>
      <Route exact path="/mapa">
        <Mapa />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );

  useEffect(() => {
    if (sessionChecked === false) dispatch(validateSession());
    return () => {
      //cleanup
    };
  }, [dispatch, sessionChecked]);

  console.log(isAuth);
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
