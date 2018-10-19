import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  USER_LOGIN_REQUEST,
} from './types';

import {
  userLoginSuccessed,
  userLoginFailed,
} from './actions';

import { login } from './requests';

export function* userLoginSaga(action) {
  try {
    const loginResponse = yield call(login, action.payload);
    yield put(userLoginSuccessed(loginResponse.data.data));
    yield put(push('/'));
  } catch (error) {
    yield put(userLoginFailed(error.message));
  }
}

export function* userSagas() {
  yield takeLatest(USER_LOGIN_REQUEST, userLoginSaga);
}
