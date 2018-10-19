import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  login,
} from '../../../src/redux/user/requests';
import * as sagas from '../../../src/redux/user/sagas';
import * as actions from '../../../src/redux/user/actions';
import * as TYPES from '../../../src/redux/user/types';
import { mockAxios } from '../../mock';

beforeAll(mockAxios);

describe('sendMessageSaga', () => {
  const action = {
    type: TYPES.USER_LOGIN_REQUEST,
    payload: {
      email: 'example@trainwithpivot.com',
      password: 'password'
    }
  };

  const userLoginSaga = cloneableGenerator(sagas.userLoginSaga)(action);

  it('should send login request', () => {
    const gen = userLoginSaga.clone();
    expect(gen.next().value).toEqual(call(login, action.payload));
    const loginResponse = {
      data: {
        avatar_url: 'http://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',
        email: 'example@trainwithpivot.com',
        first_name: 'Example',
        id: '5aa214c9-8f44-425f-b82a-e6de17ca81e9',
        last_name: 'Example',
        username: 'Example'
      }
    };
    expect(gen.next(loginResponse).value).toEqual(
      put(actions.userLoginSuccessed(loginResponse))
    );
  });

  it('should call send login request failed', () => {
    const gen = userLoginSaga.clone();
    const error = Error('login error');
    expect(gen.next().value).toEqual(call(login, action.payload));
    expect(gen.throw(error).value).toEqual(put(actions.userLoginFailed(error.message)));
  });
});
