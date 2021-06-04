import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFormOptionsProvincias,
  onAltaChange,
  onClinicaChange,
  onEpidemioChange,
  onAltaValidate,
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
import * as Yup from 'yup';

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
  const forms = useSelector((state) => state.forms);

  const steps = getSteps();

  const altaPacienteFormSchema = Yup.object().shape({
    nombre: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
    apellido: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
    sexo: Yup.object({
      value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
    }), // { value: '1' },
    edad: Yup.object({
      value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
    }), // { value: '0', error: false },
    tipoDoc: Yup.object({
      value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
    }), // { value: '1' },
    numeroDoc: Yup.object({
      value: Yup.number()
        .min(1000000, 'Al menos 7 digitos')
        .required('campo requerido')
        .typeError('Debe ser un número'),
    }), // { value: '', error: false },
    nacionalidad: Yup.object({
      value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
    }), // { value: '', error: false },
    provincia: Yup.object({
      value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
    }), // { value: '0', error: false },
    localidad: Yup.object({
      value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
    }), // { value: '0', error: false },
    domicilio: Yup.object({
      value: Yup.string().required('campo requerido'),
    }), // { value: '', error: false },
    nroDom: Yup.object({
      value: Yup.number()
        .required('campo requerido')
        .typeError('Debe ser un número'),
    }), // { value: '', error: false },
    domPiso: Yup.object({
      value: Yup.number()
        .required('campo requerido')
        .typeError('Debe ser un número'),
    }), // { value: '', error: false },
    domDto: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
    domCP: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
    domBarrio: Yup.object({
      value: Yup.string().required('campo requerido'),
    }), // { value: '', error: false },
    privadoLib: Yup.object({ value: Yup.boolean().notRequired() }), //{ value: false },
  });

  const checkMissingData = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        await altaPacienteFormSchema
          .validate(forms?.altaPaciente, { abortEarly: false })
          .then((value) => {
            const payload = Object.entries(value).map(([key, value]) => ({
              name: key,
              error: value.error,
              errorText: '',
            }));
            dispatch(onAltaValidate({ value: [], isValid: true }));
            isValid = true;
          })
          .catch((err) => {
            if (err?.name === 'ValidationError') {
              console.log(JSON.stringify(err));
              const payload = err.inner.map((e) => ({
                name: e.path.replace('.value', ''),
                error: true,
                errorText: e.message,
              }));
              dispatch(onAltaValidate({ value: payload, isValid: false }));
              isValid = false;
            }
          });
        /*const rf = forms?.requiredFields?.altaPaciente;
        const apFields = Object.entries(forms?.altaPaciente);

        const fieldsToCheck = apFields.filter((apf) => rf.includes(apf[0]));

        result = fieldsToCheck.filter((f) => {
          if (altaPacienteInitialState[f[0]].value === f[1].value) {
            dispatch(onAltaChange({ name: f[0], error: true }));
            return true;
          } else {
            console.log(`dispatching ${f[0]}`);
            dispatch(onAltaChange({ name: f[0], error: false }));
          }
        });
*/
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }

    if (isValid) {
      if (activeStep === 2 && trabajadorSalud !== '1') {
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
