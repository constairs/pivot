import { spawn } from 'redux-saga/effects';
import { userSagas } from './user/sagas';

export function* rootSaga() {
  yield spawn(userSagas);
}
