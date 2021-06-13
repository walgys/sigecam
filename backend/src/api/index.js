const express = require('express');
const login = require('./login');
const getFormOptions = require('./getFormOptions');
const createNewPacient = require('./createNewPacient');

const router = express.Router();
router.use(login);
router.use(getFormOptions);
router.use(createNewPacient);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

module.exports = router;
