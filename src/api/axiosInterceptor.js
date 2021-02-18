import axios from 'axios';
import asyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env"

const axiosInterceptor = axios.create({
  headers: {
    Authorization: `Bearer ${asyncStorage.getItem('authToken')}`,
  },
  baseURL: "http://192.168.1.11:8001",
});
console.log(API_URL)
export default axiosInterceptor;
