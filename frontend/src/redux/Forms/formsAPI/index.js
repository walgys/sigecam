import axios from 'axios';
import { API_URL } from 'utils';

export const getFormOptionsProvincias = async () => {
  return axios({
    url: `${API_URL}/api/v1/getFormOptions`,
    method: 'POST', // *GET, POST, PUT, DELETE, etc
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((result) => result.data)
    .catch((err) => console.log(err));
};

export default { getFormOptionsProvincias };
