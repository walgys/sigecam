require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const api = require('./api');

const port = process.env.PORT;

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v1', api);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

//Run app, then load http://localhost:port in a browser to see the output.
