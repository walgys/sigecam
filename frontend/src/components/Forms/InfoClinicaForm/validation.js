import * as Yup from 'yup';

export const signosSintomasModalSchema = Yup.object().shape({
  currSignosSintomas: Yup.object({
    value: Yup.string().required('campo requerido'),
  }), // { value: '', error: false },
  currSignosSintomasDescripcion: Yup.object({
    value: Yup.string().required('campo requerido'),
  }), // { value: '', error: false },
});

export const comorbilidadesModalSchema = Yup.object().shape({
  currComorbilidad: Yup.object({
    value: Yup.string().required('campo requerido'),
  }), // { value: '', error: false },
  currComorbDescripcion: Yup.object({
    value: Yup.string().required('campo requerido'),
  }), // { value: '', error: false },
});
