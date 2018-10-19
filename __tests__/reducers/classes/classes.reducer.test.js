import { classSessions as reducer, initState } from '../../../src/redux/classes/reducer';
import * as actions from '../../../src/redux/classes/actions';

import { classCreateResponse } from '../../fixtures';

const createResponse = classCreateResponse.data;

describe('class create', () => {
  it('createClassRequest', () => {
    const state = reducer(initState, actions.createClassRequest());
    expect(state.classesFetching).toBe(true);
  });
  it('createClassSuccessed', () => {
    const state = reducer(initState, actions.createClassSuccessed(createResponse));
    expect(state.classesFetching).toBe(false);
  });
  it('createClassFailed', () => {
    const state = reducer(initState, actions.createClassFailed(Error.message));
    expect(state.error).toBe(Error.message);
    expect(state.classesFetching).toBe(false);
  });
});
