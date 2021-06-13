import axios from 'axios';
import { API_URL } from 'utils';

export const validateUser = async (userName, password) => {
  return axios({
    url: `${API_URL}/api/v1/login`,
    method: 'POST', // *GET, POST, PUT, DELETE, etc
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: JSON.stringify({
      userName,
      password,
    }), // body data type must match "Content-Type" header
  })
    .then((result) => result.data)
    .catch((err) => console.log(err));
};

export const validateSession = async () => {
  return axios({
    url: `${API_URL}/api/v1/session`,
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    withCredentials: true,
  })
    .then((result) => result.data)
    .catch((err) => {
      console.log(err);
      return { isAuth: false, data: {}, errorMessage: 'Error' };
    });
};

export default { validateUser, validateSession };
