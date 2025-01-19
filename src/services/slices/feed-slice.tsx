import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TFeedState = TOrdersData & {
  isLoading: boolean;
  error: any | null;
};

const initialState: TFeedState = {
  isLoading: false,
  orders: [],
  error: null,
  total: 0,
  totalToday: 0
};

export const getFeedsThunk = createAsyncThunk('feed/getAll', async () => {
  const data = await getFeedsApi();
  return data;
});

export const feedSlice = createSlice({
  name: 'feed',
  reducerPath: 'feed',
  initialState,
  reducers: {
    addFeed: (state, action: PayloadAction<TOrder>) => {
      state.orders.push(action.payload);
    },
    removeFeed: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error ?? action.payload;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.isLoading = false;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
      });
  },
  selectors: {
    getFeeds: (state) => state.orders,
    getLoading: (state) => state.isLoading
  }
});

export const feedReducer = feedSlice.reducer;
export const { getFeeds, getLoading } = feedSlice.selectors;
export const { addFeed, removeFeed } = feedSlice.actions;
