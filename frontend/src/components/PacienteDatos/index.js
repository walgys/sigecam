import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onPacientesDatosNuevoExit,
  onInfoClinicaValidate,
  onAltaValidate,
  onEpidemioValidate,
  onInstitucionValidate,
} from 'redux/GestionPacientes/Forms';
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
  antEpidemioForm3Schema,
} from './validation';
import { CircularProgress } from '@material-ui/core';
import { setSnack, setOpenSnack } from 'redux/variables';
import { onTokenExpired } from 'redux/user';
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

const PacientesDatos = (props) => {
  const { tipoPaciente } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCommiting, setIsCommiting] = useState(false);
  const trabajoSalud = useSelector(
    (state) => state.forms.antEpidemio.form1.trabajoSalud
  );
  const resultTypes = useSelector((state) => state.constants.resultTypes);
  const history = useHistory();
  const forms = useSelector((state) => state.forms);

  const handleExit = () => {
    dispatch(onPacientesDatosNuevoExit());
  };

  useEffect(() => {
    window.addEventListener('unload', handleExit);
    return () => {
      window.removeEventListener('unload', handleExit);
      handleExit();
    };
  }, []);

  const steps = getSteps();

  const checkMissingData = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        await altaPacienteFormSchema
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

        isValid = true;
        break;
      case 1:
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
        await antEpidemioForm3Schema
          .validate(forms?.antEpidemio.form3, { abortEarly: false })
          .then((value) => {
            dispatch(onInstitucionValidate({ value: [], isValid: true }));
            setModalOpen(true);
          })
          .catch((err) => {
            if (err?.name === 'ValidationError') {
              const payload = err.inner.map((e) => ({
                error: true,
                errorText: e.message,
              }));
              dispatch(
                onInstitucionValidate({
                  value: payload,
                  isValid: false,
                })
              );
            }
          });
        break;
      default:
        break;
    }

    if (isValid) {
      if (activeStep === 2 && trabajoSalud.value !== '1') {
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
    if (tipoPaciente === 'existente') {
      const ids = {
        id: forms.id,
        idInfoClinica: forms.idInfoClinica,
        idAntEpidemiologicos: forms.idAntEpidemiologicos,
      };
      return _.merge(ids, altaPaciente, infoClinica, antEpidemio);
    }
    return _.merge(altaPaciente, infoClinica, antEpidemio);
  };

  const commitData = async () => {
    setIsCommiting(true);
    let result;
    if (tipoPaciente === 'existente') {
      result = await controlApiBackend.crudPaciente(transformPacientData(), 4);
    } else {
      result = await controlApiBackend.crudPaciente(transformPacientData(), 1);
    }

    if (result?.message === resultTypes.SUCCESS) {
      dispatch(
        setSnack({
          type: 'success',
          message:
            tipoPaciente === 'existente'
              ? 'Paciente modificado'
              : 'Nuevo paciente creado',
        })
      );
      dispatch(setOpenSnack(true));
      const historyPushTo =
        tipoPaciente === 'existente'
          ? '/gestiones/pacientes/existente'
          : '/gestiones/pacientes..';
      history.push(historyPushTo);
    }
    if (result.errorMessage === resultTypes.INVALID_TOKEN)
      dispatch(onTokenExpired());
    if (result?.message === resultTypes.ERROR) {
      dispatch(setSnack({ type: 'error', message: result.errorMessage }));
      dispatch(setOpenSnack(true));
    }
    setIsCommiting(false);
  };

  const handleNext = async () => {
    checkMissingData();
  };

  const handleBack = () => {
    if (activeStep === 4 && trabajoSalud.value !== '1') {
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
        title={
          tipoPaciente === 'existente' ? 'modificar Paciente' : 'Crear Paciente'
        }
        cancelText="NO"
        acceptText="SI"
      >
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {tipoPaciente === 'existente'
            ? '¿ Está seguro que desea modificar el Paciente ?'
            : '¿ Está seguro que desea crear el Paciente ?'}
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

      {activeStep === 0 && <AltaPacienteForm tipoPaciente={tipoPaciente} />}
      {activeStep === 1 && <InfoClinicaForm tipoPaciente={tipoPaciente} />}
      {activeStep === 2 && <AntEpidemioForm1 tipoPaciente={tipoPaciente} />}
      {activeStep === 3 && <AntEpidemioForm2 tipoPaciente={tipoPaciente} />}
      {activeStep === 4 && <AntEpidemioForm3 tipoPaciente={tipoPaciente} />}

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              {tipoPaciente === 'existente'
                ? 'Se ha modificado el Paciente'
                : 'Se ha creado el Paciente'}
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
                {activeStep === steps.length - 1
                  ? tipoPaciente === 'existente'
                    ? 'modificar Paciente'
                    : 'Crear Paciente'
                  : 'Continuar'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacientesDatos;
