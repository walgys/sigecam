import * as Yup from 'yup';

export const altaPacienteFormSchema = Yup.object().shape({
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
  nroDoc: Yup.object({
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
  calle: Yup.object({
    value: Yup.string().required('campo requerido'),
  }), // { value: '', error: false },
  telefono: Yup.object({
    value: Yup.string().required('campo requerido'),
  }), // { value: '', error: false },
  nroCalle: Yup.object({
    value: Yup.number()
      .required('campo requerido')
      .typeError('Debe ser un número'),
  }), // { value: '', error: false },
  piso: Yup.object({
    value: Yup.number()
      .required('campo requerido')
      .typeError('Debe ser un número'),
  }), // { value: '', error: false },
  depto: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
  codPos: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
  barrioVilla: Yup.object({
    value: Yup.string().required('campo requerido'),
  }), // { value: '', error: false },
  privadoLibertad: Yup.object({ value: Yup.boolean().notRequired() }), //{ value: false },
});

export const infoClinicaSchema = Yup.object().shape({
  aplica: Yup.object().shape({
    value: Yup.boolean(),
  }),
  semanaFis: Yup.object().when('aplica', (aplica, schema) => {
    return aplica.value
      ? schema.shape({
          value: Yup.number()
            .required('campo requerido')
            .notOneOf(['0', '', 0]),
        })
      : schema.shape({
          value: Yup.number(),
        });
  }),

  fechaFis: Yup.object().when('aplica', (aplica, schema) => {
    return aplica.value
      ? schema.shape({
          value: Yup.date()
            .transform((value, originalValue) => {
              return Number.isNaN(originalValue)
                ? value
                : new Date(originalValue);
            })
            .max(new Date(Date.now()), 'La fecha no puede ser posterior a hoy'),
        })
      : schema.shape({
          value: Yup.date().transform((value, originalValue) => {
            return Number.isNaN(originalValue)
              ? value
              : new Date(originalValue);
          }),
        });
  }),
  fechaPrimeraConsulta: Yup.object().when('aplica', (aplica, schema) => {
    return aplica.value
      ? schema.shape({
          value: Yup.date()
            .transform((value, originalValue) => {
              return Number.isNaN(originalValue)
                ? value
                : new Date(originalValue);
            })
            .max(new Date(Date.now()), 'La fecha no puede ser posterior a hoy'),
        })
      : schema.shape({
          value: Yup.date().transform((value, originalValue) => {
            return Number.isNaN(originalValue)
              ? value
              : new Date(originalValue);
          }),
        });
  }),
  signosSintomas: Yup.object().when('aplica', (aplica, schema) => {
    return aplica.value
      ? schema.shape({
          value: Yup.array().min(1).required('campo requerido'),
        })
      : schema.shape({
          value: Yup.array(),
        });
  }),
});

export const antEpidemioForm1Schema = Yup.object().shape({
  contactoCasos: Yup.object().shape({
    value: Yup.boolean(),
  }),
  nomApeCaso: Yup.object().when('contactoCasos', (contactoCasos, schema) => {
    return contactoCasos.value
      ? schema.shape({
          value: Yup.string().required('Campo requerido'),
        })
      : schema.shape({
          value: Yup.string(),
        });
  }),
  idCaso: Yup.object().when('contactoCasos', (contactoCasos, schema) => {
    return contactoCasos.value
      ? schema.shape({
          value: Yup.number()
            .transform((value, originalValue) => {
              return originalValue === '' ? 0 : parseInt(originalValue, 0);
            })
            .min(100, 'Debe contener al menos 3 dígitos')
            .typeError('Debe ser un número'),
        })
      : schema.shape({
          value: Yup.number().transform((value, originalValue) => {
            return originalValue === '' ? 0 : parseInt(originalValue, 0);
          }),
        });
  }),
  antVacGripal: Yup.object().shape({
    value: Yup.boolean(),
  }),
  fecVacGripal: Yup.object().when('antVacGripal', (antVacGripal, schema) => {
    return antVacGripal.value
      ? schema.shape({
          value: Yup.date()
            .transform((value, originalValue) => {
              return Number.isNaN(originalValue)
                ? value
                : new Date(originalValue);
            })
            .max(new Date(Date.now()), 'La fecha no puede ser posterior a hoy'),
        })
      : schema.shape({
          value: Yup.date().transform((value, originalValue) => {
            return Number.isNaN(originalValue)
              ? value
              : new Date(originalValue);
          }),
        });
  }),
});

export const antEpidemioForm2Schema = Yup.object().shape({
  transComunitaria: Yup.object().shape({
    value: Yup.boolean(),
  }),
  nombreDireccionInstitucion: Yup.object().when(
    'transComunitaria',
    (transComunitaria, schema) => {
      return transComunitaria.value
        ? schema.shape({
            value: Yup.string().required('Campo requerido'),
          })
        : schema.shape({
            value: Yup.string(),
          });
    }
  ),
});

export const antEpidemioForm3Schema = Yup.object().shape({
  institucion: Yup.object({
    value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
  }), // { value: '', error: false },
});
