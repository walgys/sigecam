import * as Yup from 'yup';

export const addContactoModalSchema = Yup.object().shape({
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
