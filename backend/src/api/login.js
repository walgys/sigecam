const express = require('express');
const queryAuth = require('../DB/queryAuth');
const bcrypt = require('bcrypt');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/hash', async (req, res) => {
  const { userName, password } = req.body;
  console.log(password);
  bcrypt
    .hash(password, parseInt(SALT_ROUNDS, 0))
    .then((hash) => console.log(hash))
    .catch((err) => console.log(err));
  res.json({ message: 'Auth Hash' });
});
cd;
router.post('/token', async (req, res) => {
  const { token } = await req.headers;
  res.json(jwt.decode(token));
});

router.post('/login', async (req, res) => {
  const { userName, password } = await req.body;
  if (!userName || !password) res.json({ message: 'bad info' });

  const queryResult = await queryAuth(userName);

  if ((queryResult.result.length = 1)) {
    const user = queryResult.result[0];

    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const { password, ...userData } = user;
        const token = jwt.sign(userData, JWT_SECRET);
        res.json({
          message: 'Auth Login',
          id: user.id,
          userName: user.userName,
          name: user.nombre,
          lastName: user.apellido,
          token,
        });
      } else {
        res.json({ message: 'username or password incorrect' });
      }
    });
  } else {
    res.json({ message: 'Error with data' });
  }
});

module.exports = router;
