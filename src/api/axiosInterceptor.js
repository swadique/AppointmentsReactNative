import axios from 'axios';
import {API_URL} from '@env';
import LocalStorage from '../storage';

async function axiosInterceptor(config = {}) {
  const token = await LocalStorage.authToken.getItem();
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: `${API_URL}`,
  })(config);
}
export default axiosInterceptor;
