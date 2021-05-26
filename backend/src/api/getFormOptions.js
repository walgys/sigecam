const express = require('express');
const axios = require('axios');
const queryFormOptions = require('../DB/queryFormOptions');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const API_URL = process.env.API_URL;

router.post('/getFormOptions/provincias', async (req, res) => {
  try {
    const queryResult = await axios({
      url: `${API_URL}/api/v1/internal/getFormOptions/provincias`,
      method: 'POST', // *GET, POST, PUT, DELETE, etc
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Token: req.session.jwt,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((result) => result.data)
      .catch((err) => console.log(err));
    res.json(queryResult);
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' });
  }
});

router.post('/getFormOptions/localidades', async (req, res) => {
  try {
    const queryResult = await axios({
      url: `${API_URL}/api/v1/internal/getFormOptions/localidades`,
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
    res.json(queryResult);
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' });
  }
});

router.post('/internal/getFormOptions/provincias', async (req, res) => {
  try {
    const user = jwt.verify(req.headers.token, JWT_SECRET);
    const queryResult = await queryFormOptions.queryFormOptionsProvincias();
    res.json({
      message: 'OK',
      provincias: queryResult,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' });
  }
});

router.post('/internal/getFormOptions/localidades', async (req, res) => {
  try {
    const { provincia } = req.body;
    const user = jwt.verify(req.headers.token, JWT_SECRET);
    const queryResult = await queryFormOptions.queryFormOptionsLocalidades(
      provincia
    );
    res.json({
      message: 'OK',
      localidades: queryResult,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' });
  }
});
module.exports = router;