import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://dev.trainwithpivot.com/',
  timeout: 10000,
});
