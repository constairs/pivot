import axios from 'axios';

// const username = 'dev@allmax.team';
// const password = 'trainwithpivot';

// const authorization = btoa(`${username}:${password}`);

export const axiosInstance = axios.create({
  // baseURL: 'http://dev.trainwithpivot.com/',
  baseURL: 'https://0fc332f3-1d8d-4ca2-9858-8507aaf1089c.mock.pstmn.io',
  // headers: {
  //   Authorization: `Basic ${authorization}`
  // },
  auth: {
    username: 'dev@allmax.team',
    password: 'trainwithpivot'
  },
  timeout: 10000,
});
