import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TOrderState = TOrdersData & {
  isLoading: boolean;
  error: any | null;
};

const initialState: TOrderState = {
  isLoading: false,
  orders: [],
  error: null,
  total: 0,
  totalToday: 0
};

export const getOrdersThunk = createAsyncThunk('order/getAll', async () => {
  const data = await getOrdersApi();
  return data;
});

export const orderSlice = createSlice({
  name: 'order',
  reducerPath: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error ?? action.payload;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  }
});

export const orderReducer = orderSlice.reducer;
export const { getOrders, getTotal, getTotalToday } = orderSlice.selectors;
export const { addOrder, removeOrder } = orderSlice.actions;
