import {
  assoc, pipe
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
const userLoginSuccessed = response => pipe(
  assoc('logged', true),
  assoc('email', response.email)
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
