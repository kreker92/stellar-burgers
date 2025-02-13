import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';

type TIngredientState = {
  isLoading: boolean;
  error: any | null;
  ingredients: TIngredient[];
};

const initialState: TIngredientState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  reducerPath: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error ?? action.payload;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isLoading,
    getIngredientsTypeBuns: (state) =>
      state.ingredients.filter((i) => i.type === 'bun'),
    getIngredientsTypeMains: (state) =>
      state.ingredients.filter((i) => i.type === 'main'),
    getIngredientsTypeSauces: (state) =>
      state.ingredients.filter((i) => i.type === 'sauce'),
    getIngredientById: (state, id) =>
      state.ingredients.find((i) => i._id === id)
  }
});

export const ingredientReducer = ingredientSlice.reducer;
export const {
  getIngredients,
  getIngredientsLoading,
  getIngredientsTypeBuns,
  getIngredientsTypeMains,
  getIngredientsTypeSauces,
  getIngredientById
} = ingredientSlice.selectors;
// export const { addFeed, removeFeed } = ingredientSlice.actions;
