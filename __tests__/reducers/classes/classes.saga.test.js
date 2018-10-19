import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  createClass,
} from '../../../src/redux/classes/requests';
import * as sagas from '../../../src/redux/classes/sagas';
import * as actions from '../../../src/redux/classes/actions';
import * as TYPES from '../../../src/redux/classes/types';
import { mockAxios } from '../../mock';

import { classCreateResponse } from '../../fixtures';

beforeAll(mockAxios);

describe('createClassSaga', () => {
  const action = {
    type: TYPES.CREATE_CLASS_REQUEST,
    payload: {
      title: '30 Minute Core Workout'
    }
  };

  const createClassSaga = cloneableGenerator(sagas.createClassSaga)(action);

  it('should create class request', () => {
    const gen = createClassSaga.clone();
    expect(gen.next().value).toEqual(call(createClass, action.payload));
    expect(gen.next(classCreateResponse).value).toEqual(
      put(actions.createClassSuccessed(classCreateResponse))
    );
  });

  it('should call create class failed', () => {
    const gen = createClassSaga.clone();
    const error = Error('create class error');
    expect(gen.next().value).toEqual(call(createClass, action.payload));
    expect(gen.throw(error).value).toEqual(put(actions.createClassFailed(error.message)));
  });
});
