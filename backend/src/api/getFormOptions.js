const express = require('express');
const axios = require('axios');
const queryFormOptions = require('../DB/queryFormOptions');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const API_URL = process.env.API_URL;

router.post('/getFormOptions', async (req, res) => {
  try {
    const queryResult = await axios({
      url: `${API_URL}/api/v1/internal/getFormOptions`,
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
    res.json(queryResult).end();
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' }).end();
  }
});

router.post('/internal/getFormOptions', async (req, res) => {
  try {
    const user = jwt.verify(req.headers.token, JWT_SECRET);
    const provincias = await queryFormOptions.queryFormOptionsProvincias();
    const localidades = await queryFormOptions.queryFormOptionsLocalidades();
    const localidadesFiltradas = await provincias.map((p) => {
      return {
        id: p.id,
        localidades: localidades.filter((l) => l.idProvincia === p.id),
      };
    });
    console.log(localidadesFiltradas);
    const sexo = await queryFormOptions.queryFormOptionsSexo();
    const nacionalidades =
      await queryFormOptions.queryFormOptionsNacionalidades();
    const tipoDoc = await queryFormOptions.queryFormOptionsTipoDoc();

    res
      .json({
        message: 'OK',
        provincias,
        localidades: localidadesFiltradas,
        sexo,
        nacionalidades,
        tipoDoc,
      })
      .end();
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error' }).end();
  }
});

module.exports = router;
