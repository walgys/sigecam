import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFormOptionsProvincias,
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
}));

function getSteps() {
  return [
    'Datos personales',
    'Información clínica',
    'Antecedentes epidemiológicos',
    'Antecedentes epidemiológicos 2',
    'Antecedentes epidemiológicos 3',
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    case 3:
      return 'This is the bit I really care about!';
    case 4:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

const PacientesDatosNuevo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);

  const trabajadorSalud = useSelector(
    (state) => state.forms.antEpidemio.form1.trabajadorSalud
  );
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

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
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

  return (
    <div className={classes.root}>
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
              Alta Generada
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
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Guardar' : 'Continuar'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacientesDatosNuevo;
