const express = require('express');
const login = require('./login');

const router = express.Router();
router.use(login);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

module.exports = router;
