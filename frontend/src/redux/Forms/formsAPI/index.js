import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

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
