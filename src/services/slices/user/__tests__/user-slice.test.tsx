import { expect, it, describe } from '@jest/globals';

import { initialStateUser as initialState, userSlice } from '../slice';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  updateUserThunk
} from '../actions';

import registerMock from '../../../../mocks/requests/register.json';
import userMock from '../../../../mocks/responses/user.json';

beforeAll(() => {
  const localStorageMock = { removeItem: jest.fn() };
  global.localStorage = localStorageMock as unknown as Storage;
});

describe('register reducer', () => {
  it('initializes correctly', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('getUserThunk fulfilled', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userMock.user,
      isInit: true,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  test('getUserThunk pending', () => {
    const action = {
      type: getUserThunk.pending.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, userRequest: true });
  });

  test('getUserThunk rejected', () => {
    const msgText = 'Ошибка';
    const action = {
      type: getUserThunk.rejected.type,
      payload: userMock.user,
      error: msgText
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userError: msgText,
      isInit: true,
      isAuthChecked: true
    });
  });

  test('loginUserThunk fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userMock.user,
      isAuthenticated: true,
      isAuthChecked: true
    });
  });

  test('loginUserThunk pending', () => {
    const action = {
      type: loginUserThunk.pending.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, userRequest: true });
  });

  test('loginUserThunk rejected', () => {
    const msgText = 'Ошибка';
    const action = {
      type: loginUserThunk.rejected.type,
      payload: userMock.user,
      error: msgText
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userError: msgText,
      isAuthChecked: true
    });
  });

  test('logoutUserThunk fulfilled', () => {
    const action = {
      type: logoutUserThunk.fulfilled.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  test('logoutUserThunk pending', () => {
    const action = {
      type: logoutUserThunk.pending.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, userRequest: true });
  });

  test('logoutUserThunk rejected', () => {
    const msgText = 'Ошибка';
    const action = {
      type: logoutUserThunk.rejected.type,
      payload: userMock.user,
      error: msgText
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userError: msgText,
      isAuthChecked: true
    });
  });

  test('updateUserThunk fulfilled', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: userMock.user,
      isAuthenticated: true,
      isAuthChecked: true
    });
  });

  test('updateUserThunk pending', () => {
    const action = {
      type: updateUserThunk.pending.type,
      payload: userMock.user
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, userRequest: true });
  });

  test('updateUserThunk rejected', () => {
    const msgText = 'Ошибка';
    const action = {
      type: updateUserThunk.rejected.type,
      payload: userMock.user,
      error: msgText
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userError: msgText,
      isAuthChecked: true
    });
  });
});
