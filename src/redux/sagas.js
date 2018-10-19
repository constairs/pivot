import { spawn } from 'redux-saga/effects';
import { userSagas } from './user/sagas';
import { classesSagas } from './classes/sagas';

export function* rootSaga() {
  yield spawn(userSagas);
  yield spawn(classesSagas);
}
