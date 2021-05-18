import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';

const App = () => {
  const loggedIn = false;

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn} />
      <Router>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
