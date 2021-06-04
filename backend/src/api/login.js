const express = require('express');
const queryAuth = require('../DB/queryAuth');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;

const createResponse = (user, errorMessage = null, isAuth = false) => {
  return {
    isAuth,
    data:
      user !== null
        ? {
            id: user.id,
            tipoUsuario: user.tipoUsuario,
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
      res.json(createResponse(user, null, true));
    } else {
      res.json(createResponse(null, 'Session Expired'));
    }
  } catch (err) {
    console.log('Invalid token');
    res.json(createResponse(null, 'Invalid token'));
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

                res.json(createResponse(user, null, true));
              } else {
                res.json(
                  createResponse(null, 'username or password incorrect')
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json(createResponse(null, 'username or password incorrect'));
        }
      } else {
        res.json(createResponse(null, 'Error with data'));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
