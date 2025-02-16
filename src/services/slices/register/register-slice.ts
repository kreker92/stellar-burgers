import { registerUserApi, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../../utils/cookie';

type TRegisterState = {
  data: any | null;
  error: any | null;
  registerRequest: boolean;
};

const initialState: TRegisterState = {
  data: null,
  error: null,
  registerRequest: false
};

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }: TRegisterData) => {
    const data = await registerUserApi({ email, password, name });
    if (!data?.success) {
      return data;
    }
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.registerRequest = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.registerRequest = false;
        state.error = action.error ?? action.payload;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerRequest = false;
      });
  },
  reducers: {},
  selectors: {
    registerErrorSelector: (state) => state.error,
    registerDataSelector: (state) => state.data
  }
});

export const registerReducer = registerSlice.reducer;
export const { registerErrorSelector, registerDataSelector } =
  registerSlice.selectors;
export { initialState as initialStateRegister };
