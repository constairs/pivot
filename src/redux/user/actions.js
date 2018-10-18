import * as TYPES from './types';

export const userLoginRequest = loginUserData => ({
  type: TYPES.USER_LOGIN_REQUEST,
  payload: loginUserData
});
export const userLoginSuccessed = loginResponse => ({
  type: TYPES.USER_LOGIN_SUCCESSED,
  payload: loginResponse
});
export const userLoginFailed = error => ({
  type: TYPES.USER_LOGIN_FAILED,
  payload: error
});
