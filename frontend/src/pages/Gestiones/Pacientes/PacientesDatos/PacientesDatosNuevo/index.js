import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormOptionsProvincias } from 'redux/Forms';
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
    (state) => state.forms.antEpidemio.trabajadorSalud
  );

  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === steps.length) {
    } else {
      if (activeStep === 2 && trabajadorSalud !== '1') {
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 4 && trabajadorSalud !== '1') {
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    dispatch(getFormOptionsProvincias());
    return () => {};
  }, [dispatch]);
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacientesDatosNuevo;
