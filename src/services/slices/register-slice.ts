import { loginUserApi, registerUserApi, TLoginData, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

/*
{
    "success": true,
    "user": {
        "email": "zvv1992@example.com",
        "name": "Виктор"
        pass 123456
    },
    "accessToken": "Bearer eyJhbGc.-IgOuE-CEAFlEGUDneGDnpvkssaAeNX_DN33VEfKHhk",
    "refreshToken": "a9ec598ff9188703cc31e0bb677a8b35c4dadf010fc60bfceb672d495217af37079f0e70d907bf11"
}
*/

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
// export const authenticatedSelector = (userState: TUserState) =>
//   userState.isAuthenticated;
