const express = require('express');
const axios = require('axios');
const queryFormOptions = require('../DB/queryFormOptions');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const { resultTypes } = require('../utils');
const JWT_SECRET = process.env.JWT_SECRET;
const API_URL = process.env.API_URL;
require('../utils');

router.post('/createNewPacient', async (req, res) => {
  try {
    if (typeof req.session.jwt !== 'undefined') {
      const queryResult = await axios({
        url: `${API_URL}/api/v1/internal/createNewPacient`,
        method: 'POST', // *GET, POST, PUT, DELETE, etc
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Token: req.session.jwt,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: req.body,
      })
        .then((result) => result.data)
        .catch((err) => console.log(err));

      res.json({ ...queryResult, message: 'OK' }).end();
    } else {
      res.json({ ...queryResult, message: 'OK' }).end();
    }
  } catch (err) {
    console.log(err);
    res
      .json({ message: resultTypes.ERROR, errorMessage: 'Token expired' })
      .end();
  }
});

router.post('/internal/createNewPacient', async (req, res) => {
  try {
    const user = jwt.verify(req.headers.token, JWT_SECRET);
    console.log(req.body);
    res
      .json({
        message: 'OK',
      })
      .end();
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' }).end();
  }
});

module.exports = router;
