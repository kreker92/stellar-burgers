import { expect, test, describe } from '@jest/globals';

import { server } from '../../../../mocks/node';

// import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { authenticatedSelector } from '../slice';
import {
  loginUserThunk,
  logoutUserThunk,
  updateUserThunk,
  getUserThunk,
} from '../actions';
import { orderBurgerApi, updateUserApi } from '@api';

import store from '../../../store';

import registerMock from '../../../../mocks/requests/register.json';
import userMock from '../../../../mocks/responses/user.json';

describe('Проверяем слайс constructor', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  beforeAll(() => {
    // eslint-disable-next-line
    global.document = {
      cookie: 'accessToken=123,refreshToken=456'
    } as any;
  });

  test('тест loginUserThunk', async () => {
    expect(store.getState().user.isAuthenticated).toBe(false);
    const authParams = {
      email: registerMock.email,
      password: registerMock.password
    };
    await store.dispatch(loginUserThunk(authParams));
    const isAuthenticated = authenticatedSelector(store.getState());
    expect(isAuthenticated).toBe(true);
  });

  test('тест getUserThunk', async () => {
    expect(store.getState().user.user).toBe(null);
    await store.dispatch(getUserThunk());
    expect(store.getState().user.user).toEqual(userMock.user);
  });

  test('тест updateUserThunk', async () => {
    expect(store.getState().user.user).toEqual(userMock.user);
    const newUserParams = {
      ...userMock.user,
      name: 'qwe'
    };
    await store.dispatch(updateUserThunk(newUserParams));
    expect(store.getState().user.user).toEqual(newUserParams);
  });

  test('тест authenticatedSelector', () => {
    const res = authenticatedSelector({
      user: {
        user: userMock.user,
        isInit: true,
        isAuthChecked: true,
        isAuthenticated: true,
        userError: null,
        userRequest: false
      }
    });
    expect(res).toEqual(true);
  });

  test('тест logoutUserThunk', async () => {
    let isAuthenticated = authenticatedSelector(store.getState());
    expect(isAuthenticated).toBe(true);
    await store.dispatch(logoutUserThunk());
    isAuthenticated = authenticatedSelector(store.getState());
    expect(isAuthenticated).toBe(false);
  });
});
