import axios from 'axios';
import LocalStorage from '../storage';
import {SERVER_URI} from '../config/connection';

async function axiosInterceptor(config = {}) {
  const baseURL = SERVER_URI;
  const token = await LocalStorage.authToken.getItem();
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: `${baseURL}`,
  })(config);
}
export default axiosInterceptor;
