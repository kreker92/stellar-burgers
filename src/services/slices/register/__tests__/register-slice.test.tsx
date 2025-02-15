import { expect, test, describe } from '@jest/globals';

import { server } from '../../../../mocks/node';

import { registerUserThunk } from '../register-slice';

import store from '../../../store';

import registerMock from '../../../../mocks/requests/register.json';
import userMock from '../../../../mocks/responses/user.json';

describe('Проверяем слайс register', () => {
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

  test('тест registerUserThunk', async () => {
    expect(store.getState().user.isAuthenticated).toBe(false);
    const authParams = {
      email: registerMock.email,
      password: registerMock.password
    };
    await store.dispatch(registerUserThunk(registerMock));
    expect(store.getState().register.data).toEqual(userMock.user);
  });
});
