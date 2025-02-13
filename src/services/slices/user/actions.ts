import {
  getUserApi,
  loginUserApi,
  logoutApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../../utils/cookie';
import { TUser } from '@utils-types';

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (data?.success) {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
    }

    return data.user;
  }
);

export const logoutUserThunk = createAsyncThunk('user/logout', logoutApi);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => {
    const data = await updateUserApi(user);
    return data.user;
  }
);

export const getUserThunk = createAsyncThunk('user/get', async () => {
  const data = await getUserApi();
  return data.user;
});

export const setUser = createAction<TUser | null, 'user/setUser'>(
  'user/setUser'
);
