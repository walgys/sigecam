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
  telefono: Yup.object({
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

export const infoClinicaSchema = Yup.object().shape({
  aplica: Yup.object().shape({
    value: Yup.boolean(),
  }),
  semanaFis: Yup.object({
    value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
  }), // { value: '1' },
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
  primeraConsulta: Yup.object().when('aplica', (aplica, schema) => {
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
  signosSintomas: Yup.object({
    value: Yup.array().min(1).required('campo requerido'),
  }), // { value: '', error: false },
});

export const antEpidemioForm1Schema = Yup.object().shape({
  contactoEstrechoCovid: Yup.object().shape({
    value: Yup.boolean(),
  }),
  contactoEstrechoCovidNombre: Yup.object().when(
    'contactoEstrechoCovid',
    (contactoEstrechoCovid, schema) => {
      return contactoEstrechoCovid.value
        ? schema.shape({
            value: Yup.string().required('Campo requerido'),
          })
        : schema.shape({
            value: Yup.string(),
          });
    }
  ),
  idDniSnvs: Yup.object().when(
    'contactoEstrechoCovid',
    (contactoEstrechoCovid, schema) => {
      return contactoEstrechoCovid.value
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
    }
  ),
  vacunacionGripal: Yup.object().shape({
    value: Yup.boolean(),
  }),
  fechaVacunaGripal: Yup.object().when(
    'vacunacionGripal',
    (vacunacionGripal, schema) => {
      return vacunacionGripal.value
        ? schema.shape({
            value: Yup.date()
              .transform((value, originalValue) => {
                return Number.isNaN(originalValue)
                  ? value
                  : new Date(originalValue);
              })
              .max(
                new Date(Date.now()),
                'La fecha no puede ser posterior a hoy'
              ),
          })
        : schema.shape({
            value: Yup.date().transform((value, originalValue) => {
              return Number.isNaN(originalValue)
                ? value
                : new Date(originalValue);
            }),
          });
    }
  ),
});

export const antEpidemioForm2Schema = Yup.object().shape({
  posibleTransmisionComunitaria: Yup.object().shape({
    value: Yup.boolean(),
  }),
  nombreDireccionInstitucion: Yup.object().when(
    'posibleTransmisionComunitaria',
    (posibleTransmisionComunitaria, schema) => {
      return posibleTransmisionComunitaria.value
        ? schema.shape({
            value: Yup.string().required('Campo requerido'),
          })
        : schema.shape({
            value: Yup.string(),
          });
    }
  ),
});
