import { user as reducer, initState } from '../../../src/redux/user/reducer';
import * as actions from '../../../src/redux/user/actions';

import { userData } from '../../fixtures';

describe('user create', () => {
  it('userLoginRequest', () => {
    const state = reducer(initState, actions.userLoginRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userLoginSuccessed', () => {
    const state = reducer(initState, actions.userLoginSuccessed(userData));
    expect(state.avatar_url).toBe(userData.avatar_url);
    expect(state.email).toBe(userData.email);
    expect(state.first_name).toBe(userData.first_name);
    expect(state.id).toBe(userData.id);
    expect(state.last_name).toBe(userData.last_name);
    expect(state.logged).toBe(true);
    expect(state.notification).toEqual({ show: true, success: `User ${userData.username} successfully logged in!`, error: '' });
    expect(state.userFetching).toBe(false);
    expect(state.username).toBe(userData.username);
  });
  it('userLoginFailed', () => {
    const state = reducer(initState, actions.userLoginFailed(Error.message));
    expect(state.error).toBe(Error.message);
  });
});
