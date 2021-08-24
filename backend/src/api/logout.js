const express = require('express');
const queryAuth = require('../DB/queryAuth');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { resultTypes } = require('../utils');
const JWT_SECRET = process.env.JWT_SECRET;
require('../utils');

const createResponse = (
  user,
  errorMessage = null,
  resultType = resultTypes.OK,
  isAuth = false
) => {
  return {
    isAuth,
    message: resultType,
    data:
      user !== null
        ? {
            id: user.id,
            tipoUsuario: user.tipoUsuario,
            idInstitucion: user.idInstitucion,
            userName: user.userName,
            name: user.nombre,
            lastName: user.apellido,
          }
        : {},
    errorMessage,
  };
};

router.post(
  '/logout',

  async (req, res) => {
    try {
        if (req.session.jwt) {
          const user = jwt.verify(req.session.jwt, JWT_SECRET);
          req.session.destroy(()=>res.json(createResponse(null, null, resultTypes.TOKEN_REVOKED)).end());
        } else {
          res.json(createResponse(null, 'Session Expired')).end();
        }
      } catch (err) {
        console.log('Invalid token');
        res.json(createResponse(null, 'Invalid token')).end();
      }
   
  }
);

module.exports = router;
