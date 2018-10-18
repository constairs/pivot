import { put, takeLatest } from 'redux-saga/effects';
import {
  USER_LOGIN_REQUEST,
} from './types';

import {
  userLoginSuccessed,
  userLoginFailed,
} from './actions';

export function* userLoginSaga(action) {
  try {
    yield put(userLoginSuccessed(action.payload));
  } catch (error) {
    yield put(userLoginFailed(error.message));
  }
}

export function* userSagas() {
  yield takeLatest(USER_LOGIN_REQUEST, userLoginSaga);
}
