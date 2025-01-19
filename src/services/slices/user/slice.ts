import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  updateUserThunk
} from './actions';

type TUserState = {
  user: TUser | null;
  isInit: boolean;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userError: any | null;
  userRequest: boolean;
};

const initialState: TUserState = {
  user: null,
  isInit: false,
  isAuthChecked: false,
  isAuthenticated: false,
  userError: null,
  userRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  // reducerPath: 'auth',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.userRequest = false;
        state.userError = action.error ?? action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isInit = true;
        state.userRequest = false;
        state.userError = action.error ?? action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isInit = true;
        state.user = action.payload;
        state.userRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
        state.isAuthChecked = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.userRequest = false;
        state.userError = action.error ?? action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
        state.isAuthChecked = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.userRequest = false;
        state.userError = action.error ?? action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.user = null;
        state.userRequest = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        localStorage.removeItem('refreshToken');
      });
  },
  selectors: {
    authenticatedSelector: (userState) => userState.isAuthenticated,
    loginErrorSelector: (userState) => userState.userError
  }
});

export const userReducer = userSlice.reducer;
export const { authenticatedSelector, loginErrorSelector } =
  userSlice.selectors;
export const { init } = userSlice.actions;
