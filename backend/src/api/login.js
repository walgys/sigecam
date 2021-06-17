const express = require('express');
const queryAuth = require('../DB/queryAuth');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { resultTypes } = require('../utils');
const SALT_ROUNDS = process.env.SALT_ROUNDS;
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

router.post('/session', (req, res) => {
  try {
    if (req.session.jwt) {
      const user = jwt.verify(req.session.jwt, JWT_SECRET);
      res.json(createResponse(user, null, null, true)).end();
    } else {
      res.json(createResponse(null, 'Session Expired')).end();
    }
  } catch (err) {
    console.log('Invalid token');
    res.json(createResponse(null, 'Invalid token')).end();
  }
});

router.post(
  '/login',

  async (req, res) => {
    try {
      console.log(req.body);
      const { userName, password } = await req.body;
      if (
        !userName ||
        (!password &&
          (typeof userName !== 'undefined' || typeof password !== 'undefined'))
      )
        res.json({ message: 'bad info' });
      const queryResult = await queryAuth(userName);
      if ((queryResult.length = 1)) {
        const user = queryResult[0];
        if (typeof user !== 'undefined') {
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              if (result) {
                const { password, ...userData } = user;
                const token = jwt.sign(userData, JWT_SECRET, {
                  expiresIn: '1d',
                });
                req.session.jwt = token;

                res.json(createResponse(user, null, null, true)).end();
              } else {
                res
                  .json(
                    createResponse(
                      null,
                      'username or password incorrect',
                      resultTypes.ERROR
                    )
                  )
                  .end();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res
            .json(
              createResponse(
                null,
                'username or password incorrect',
                resultTypes.ERROR
              )
            )
            .end();
        }
      } else {
        res
          .json(createResponse(null, 'Error with data', resultTypes.ERROR))
          .end();
      }
    } catch (err) {
      console.log(err);
      res.end();
    }
  }
);

module.exports = router;
