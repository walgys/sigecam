const express = require('express');
const axios = require('axios');
const queryResourses = require('../DB/queryGetPatientResourses');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const { resultTypes } = require('../utils');
const JWT_SECRET = process.env.JWT_SECRET;
const API_URL = process.env.API_URL;

router.post('/getPatientResourses', async (req, res) => {
  try {
    if (typeof req.session.jwt !== 'undefined') {
      const queryResult = await axios({
        url: `${API_URL}/api/v1/internal/getPatientResourses`,
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
      res.json({ ...queryResult, message: resultTypes.OK }).end();
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
    res.json({ message: resultTypes.ERROR, errorMessage: 'Error' }).end();
  }
});

router.post('/internal/getPatientResourses', async (req, res) => {
  try {
    const user = jwt.verify(req.headers.token, JWT_SECRET);
    let recursosPaciente = [];
    let tiposRecurso = [];
    let ubicacionesInstitucion = [];

    recursosPaciente = await queryResourses.queryGetPatientResourses(
      req.body?.idPaciente
    );

    tiposRecurso = await queryResourses.queryGetTiposRecurso();

    ubicacionesInstitucion = await queryResourses.queryGetUbicaciones(
      req.body?.idPaciente
    );

    res
      .json({
        message: resultTypes.OK,
        recursosPaciente,
        tiposRecurso,
        ubicacionesInstitucion,
        errorMessage: null,
      })
      .end();
  } catch (err) {
    console.log(err);
    res
      .json({
        message: resultTypes.ERROR,
        errorMessage: 'Error procesando pedido',
      })
      .end();
  }
});

module.exports = router;
