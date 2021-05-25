const express = require('express');
const login = require('./login');
const getFormOptions = require('./getFormOptions');

const router = express.Router();
router.use(login);
router.use(getFormOptions);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

module.exports = router;
