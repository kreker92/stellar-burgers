import { expect, test, describe } from '@jest/globals';

import {
  initialStateRegister as initialState,
  registerUserThunk,
  registerSlice
} from '../register-slice';

// import registerMock from '../../../../mocks/requests/register.json';
import userMock from '../../../../mocks/responses/user.json';

describe('Проверяем слайс register', () => {
  test('initializes correctly', () => {
    const state = registerSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('registerUserThunk fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: userMock.user
    };
    const state = registerSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, data: userMock.user });
  });

  test('registerUserThunk pending', () => {
    const action = {
      type: registerUserThunk.pending.type,
      payload: userMock.user
    };
    const state = registerSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, registerRequest: true });
  });

  test('registerUserThunk rejected', () => {
    const msgText = 'Ошибка';
    const action = {
      type: registerUserThunk.rejected.type,
      payload: userMock.user,
      error: msgText
    };
    const state = registerSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: msgText });
  });
});
