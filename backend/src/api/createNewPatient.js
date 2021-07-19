const express = require('express');
const axios = require('axios');
const createNewPatient = require('../DB/createNewPatient');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { resultTypes } = require('../utils');
const JWT_SECRET = process.env.JWT_SECRET;
const API_URL = process.env.API_URL;
require('../utils');

router.post('/createNewPatient', async (req, res) => {
  try {
    if (typeof req.session.jwt !== 'undefined') {
      const queryResult = await axios({
        url: `${API_URL}/api/v1/internal/createNewPatient`,
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
      console.log(queryResult);
      res.json({ ...queryResult }).end();
    } else {
      res
        .json({
          message: resultTypes.INVALID_TOKEN,
          errorMessage: 'Token caducado',
        })
        .end();
    }
  } catch (err) {
    console.log(err);
    res
      .json({ message: resultTypes.ERROR, errorMessage: 'Server error' })
      .end();
  }
});

router.post('/internal/createNewPatient', async (req, res) => {
  try {
    const user = jwt.verify(req.headers.token, JWT_SECRET);

    const createNewPatientResult = await createNewPatient
      .create(req.body)
      .then((r) => r);
    console.log(createNewPatientResult);
    res
      .json({
        message: createNewPatientResult.result,
        errorMessage: createNewPatientResult.message,
      })
      .end();
  } catch (err) {
    console.log(err);
    res
      .json({ message: resultTypes.ERROR, errorMessage: 'Server error' })
      .end();
  }
});

module.exports = router;
