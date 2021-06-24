import * as Yup from 'yup';
var current = new Date();
const tomorrow = new Date(current.getTime() + 8640000);

export const addContactoModalSchema = Yup.object().shape({
  nombre: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
  apellido: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
  sexo: Yup.object({
    value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
  }), // { value: '1' },
  tipoDoc: Yup.object({
    value: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
  }), // { value: '1' },
  nroDoc: Yup.object({
    value: Yup.number()
      .min(1000000, 'Al menos 7 digitos')
      .required('campo requerido')
      .typeError('Debe ser un número'),
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
  nroCalle: Yup.object({
    value: Yup.number()
      .required('campo requerido')
      .typeError('Debe ser un número'),
  }), // { value: '', error: false },
  telefono: Yup.object({
    value: Yup.string().required('campo requerido'),
  }),
  piso: Yup.object({
    value: Yup.number()
      .required('campo requerido')
      .typeError('Debe ser un número'),
  }), // { value: '', error: false },
  depto: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
  codPos: Yup.object({ value: Yup.string().required('campo requerido') }), // { value: '', error: false },
  barrioVilla: Yup.object({
    value: Yup.string().required('campo requerido'),
  }),
  ultimoContacto: Yup.object({
    value: Yup.date()
      .transform((value, originalValue) => {
        return Number.isNaN(originalValue) ? value : new Date(originalValue);
      })
      .max(new Date(tomorrow), 'La fecha no puede ser posterior a hoy'),
  }),
  tipoContacto: Yup.object({ value: Yup.string().required('campo requerido') }),
});
