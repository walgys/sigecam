import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDatosFormularios,
  onInfoClinicaValidate,
  onAltaValidate,
  onEpidemioValidate,
} from 'redux/Forms';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AltaPacienteForm from 'components/Forms/AltaPacienteForm';
import InfoClinicaForm from 'components/Forms/InfoClinicaForm';
import DialogModal from 'components/DialogModal';
import {
  AntEpidemioForm1,
  AntEpidemioForm2,
  AntEpidemioForm3,
} from 'components/Forms/AntEpidemioForms';
import {
  altaPacienteFormSchema,
  infoClinicaSchema,
  antEpidemioForm1Schema,
  antEpidemioForm2Schema,
} from './validation';
import { CircularProgress } from '@material-ui/core';
import { setSnack, setOpenSnack } from 'redux/variables';
import { useHistory } from 'react-router-dom';
import ControlApiBackend from 'services/controlApiBackend';
import * as _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  colorPrimary: {
    marginRight: '1rem',
  },
}));

function getSteps() {
  return [
    'Datos personales',
    'Información clínica',
    'Antecedentes epidemiológicos',
    'Trabajador de salud',
    'Contactos',
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Datos Personales';
    case 1:
      return 'Información clínica';
    case 2:
      return 'Antecedentes Epidemiológicos';
    case 3:
      return 'Trabajador de salud';
    case 4:
      return 'Contactos';
    default:
      return 'Índice desconocido';
  }
}

const controlApiBackend = new ControlApiBackend();

const PacientesDatosNuevo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCommiting, setIsCommiting] = useState(false);
  const trabajadorSalud = useSelector(
    (state) => state.forms.antEpidemio.form1.trabajadorSalud
  );
  const history = useHistory();
  const forms = useSelector((state) => state.forms);

  const steps = getSteps();

  const checkMissingData = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        /* await altaPacienteFormSchema
          .validate(forms?.altaPaciente, { abortEarly: false })
          .then((value) => {
            dispatch(onAltaValidate({ value: [], isValid: true }));
            isValid = true;
          })
          .catch((err) => {
            if (err?.name === 'ValidationError') {
              const payload = err.inner.map((e) => ({
                name: e.path.replace('.value', ''),
                error: true,
                errorText: e.message,
              }));
              dispatch(onAltaValidate({ value: payload, isValid: false }));
              isValid = false;
            }
          });
*/
        isValid = true;
        break;
      case 1:
        if (forms?.infoClinica.aplica.value === '1') {
          await infoClinicaSchema
            .validate(forms?.infoClinica, { abortEarly: false })
            .then((value) => {
              dispatch(onInfoClinicaValidate({ value: [], isValid: true }));
              isValid = true;
            })
            .catch((err) => {
              if (err?.name === 'ValidationError') {
                const payload = err.inner.map((e) => ({
                  name: e.path.replace('.value', ''),
                  error: true,
                  errorText: e.message,
                }));
                dispatch(
                  onInfoClinicaValidate({ value: payload, isValid: false })
                );
                isValid = false;
              }
            });
        } else {
          isValid = true;
        }

        break;
      case 2:
        await antEpidemioForm1Schema
          .validate(forms?.antEpidemio.form1, { abortEarly: false })
          .then((value) => {
            dispatch(
              onEpidemioValidate({ value: [], form: 'form1', isValid: true })
            );
            isValid = true;
          })
          .catch((err) => {
            if (err?.name === 'ValidationError') {
              const payload = err.inner.map((e) => ({
                name: e.path.replace('.value', ''),
                error: true,
                errorText: e.message,
              }));
              dispatch(
                onEpidemioValidate({
                  value: payload,
                  form: 'form1',
                  isValid: false,
                })
              );
              isValid = false;
            }
          });
        break;
      case 3:
        await antEpidemioForm2Schema
          .validate(forms?.antEpidemio.form2, { abortEarly: false })
          .then((value) => {
            dispatch(
              onEpidemioValidate({ value: [], form: 'form2', isValid: true })
            );
            isValid = true;
          })
          .catch((err) => {
            if (err?.name === 'ValidationError') {
              const payload = err.inner.map((e) => ({
                name: e.path.replace('.value', ''),
                error: true,
                errorText: e.message,
              }));
              dispatch(
                onEpidemioValidate({
                  value: payload,
                  form: 'form2',
                  isValid: false,
                })
              );
              isValid = false;
            }
          });
        break;
      case 4:
        break;
      default:
        break;
    }

    if (isValid) {
      if (activeStep === 2 && trabajadorSalud.value !== '1') {
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const transformPacientData = () => {
    const altaPaciente = _.mapValues(forms.altaPaciente, (o) => o.value);
    const infoClinica = _.mapValues(forms.infoClinica, (o) => o.value);
    const antEpidemio = _.mapValues(
      _.reduce(forms.antEpidemio, (res, v, k) => (res = { ...res, ...v }), {}),
      (o) => o.value
    );
    return _.merge(altaPaciente, infoClinica, antEpidemio);
  };

  const commitData = async () => {
    setIsCommiting(true);
    const result = await controlApiBackend.crudPaciente(
      transformPacientData(),
      1
    );
    if (result?.message === 'OK') {
      dispatch(setSnack({ type: 'success', message: 'Nuevo paciente creado' }));
      dispatch(setOpenSnack(true));
      history.push('/gestiones/pacientes/datos');
    }

    if (result?.message === 'ERROR') {
      dispatch(setSnack({ type: 'error', message: result.error }));
      dispatch(setOpenSnack(true));
    }

    setIsCommiting(false);
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setModalOpen(true);
    } else {
      checkMissingData();
    }
  };

  const handleBack = () => {
    if (activeStep === 4 && trabajadorSalud.value !== '1') {
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const ConfirmationDialog = () => {
    const handleModalYes = () => {
      commitData();
      setModalOpen(false);
    };

    const handleModalClose = () => {
      setModalOpen(false);
    };

    return (
      <DialogModal
        onClose={() => handleModalClose()}
        onAdd={() => handleModalYes()}
        open={modalOpen}
        title={'Crear Paciente'}
        cancelText="NO"
        acceptText="SI"
      >
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          ¿ Está seguro que desea crear el Paciente ?
        </Typography>
      </DialogModal>
    );
  };

  return (
    <div className={classes.root}>
      <ConfirmationDialog />

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && <AltaPacienteForm />}
      {activeStep === 1 && <InfoClinicaForm />}
      {activeStep === 2 && <AntEpidemioForm1 />}
      {activeStep === 3 && <AntEpidemioForm2 />}
      {activeStep === 4 && <AntEpidemioForm3 />}

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Se ha creado el paciente
            </Typography>
            <Button onClick={handleReset}>Volver</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Volver
              </Button>
              <Button
                disabled={isCommiting}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {isCommiting && (
                  <CircularProgress
                    size="1rem"
                    className={classes.colorPrimary}
                  />
                )}
                {activeStep === steps.length - 1 ? 'Crear' : 'Continuar'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacientesDatosNuevo;
