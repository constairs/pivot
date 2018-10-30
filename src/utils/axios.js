import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://dev.trainwithpivot.com/',
  auth: {
    username: 'dev@allmax.team',
    password: 'trainwithpivot'
  },
  timeout: 10000,
});
