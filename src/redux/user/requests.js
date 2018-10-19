import { axiosInstance } from '../../utils/axios';

export const login = loginData => axiosInstance.post('/v1/login', loginData);
