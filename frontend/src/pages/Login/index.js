import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
      display: 'flex',
    },
  },
  container: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '6rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '2rem',
    width: 400,
    borderRadius: '10px',
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { hasError } = props;

  const onUserChange = (value) => {
    setUsuario(value);
  };
  const onPasswordChange = (value) => {
    setPassword(value);
  };

  const sendLogin = () => {
    console.log('Click');
  };
  console.log(`Usuario: ${usuario}, password: ${password}`);
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              error={hasError}
              id="outlined-error"
              label="Usuario"
              variant="outlined"
              onChange={(e) => onUserChange(e.target.value)}
            />
            <TextField
              error={hasError}
              id="standard-password-input"
              label="Password"
              type="password"
              helperText={hasError ? 'Usuario o password incorrecto' : ''}
              variant="outlined"
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              style={{ width: '90%' }}
              color="primary"
              disableElevation
              onClick={() => sendLogin()}
            >
              Acceder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
