import {
  assoc, assocPath, pipe
} from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  avatar_url: '',
  email: '',
  first_name: '',
  id: '',
  last_name: '',
  logged: false,
  notification: {
    error: '',
    success: '',
    show: false
  },
  userFetching: false,
  username: '',
  error: ''
};

const userLoginRequest = () => assoc('userFetching', true);
const userLoginSuccessed = loginResponse => pipe(
  assoc('avatar_url', loginResponse.avatar_url),
  assoc('email', loginResponse.email),
  assoc('first_name', loginResponse.first_name),
  assoc('id', loginResponse.id),
  assoc('last_name', loginResponse.last_name),
  assoc('logged', true),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `User ${loginResponse.username} successfully logged in!`),
  assoc('userFetching', false),
  assoc('username', loginResponse.username)
);
const userLoginFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const handlers = {
  [TYPES.USER_LOGIN_REQUEST]: userLoginRequest,
  [TYPES.USER_LOGIN_SUCCESSED]: userLoginSuccessed,
  [TYPES.USER_LOGIN_FAILED]: userLoginFailed
};

export const user = createReducer(initState, handlers);
