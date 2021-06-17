import * as Yup from 'yup';

export const signosSintomasModalSchema = Yup.object().shape({
  currSignosSintomas: Yup.object({
    id: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
  }), // { value: '0', error: false },
});

export const comorbilidadesModalSchema = Yup.object().shape({
  currComorbilidad: Yup.object({
    id: Yup.number().required('campo requerido').notOneOf(['0', '', 0]),
  }), // { value: '0', error: false },
});
