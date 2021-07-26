const express = require('express');
const login = require('./login');
const getFormOptions = require('./getFormOptions');
const createNewPacient = require('./createNewPatient');
const getPatients = require('./getPatients');
const getPatientResources = require('./getPatientResources');
const updatePatientResources = require('./updatePatientResources');
const getPatientData = require('./getPatientData');
const updatePatientData = require('./updatePatientData');

const router = express.Router();
router.use(login);
router.use(getFormOptions);
router.use(createNewPacient);
router.use(getPatients);
router.use(getPatientResources);
router.use(updatePatientResources);
router.use(getPatientData);
router.use(updatePatientData);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

module.exports = router;
