require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const MySQLConn = require('./DB/connectDB');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const api = require('./api');

const port = process.env.PORT;

const app = express();
const sessionStore = new MySQLStore(
  {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    createDatabaseTable: true,
    // Whether or not to automatically check for and clear expired sessions:
    clearExpired: true,
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  MySQLConn
);
app.use(cors({ credentials: true, origin: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    name: 'sigecam_cookie',
    secret: process.env.SESSION_SECRET,
    resave: true,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(morgan('dev'));
app.use(helmet());

app.use(express.json());
app.use('/api/v1', api);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

//Run app, then load http://localhost:port in a browser to see the output.
