import * as _ from 'lodash';
import axios from 'axios';
import { API_URL } from 'utils';

export const crearPaciente = async (forms) => {
  const altaPaciente = _.mapValues(forms.altaPaciente, (o) => o.value);
  const infoClinica = _.mapValues(forms.infoClinica, (o) => o.value);
  const antEpidemio = _.mapValues(
    _.reduce(forms.antEpidemio, (res, v, k) => (res = { ...res, ...v }), {}),
    (o) => o.value
  );
  const dataToSend = _.merge(altaPaciente, infoClinica, antEpidemio);
  console.log(JSON.stringify(dataToSend));
  return axios({
    url: `${API_URL}/api/v1/createNewPacient`,
    method: 'POST', // *GET, POST, PUT, DELETE, etc
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      data: dataToSend,
    },
  })
    .then((result) => result.data)
    .catch((err) => {
      return { message: 'ERROR', error: 'Error de conexión' };
    });
};
