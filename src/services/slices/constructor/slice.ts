import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerThunk } from './actions';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          ({ id }) => id !== action.payload.id
        );
    },
    resetModalData: (state) => {
      state.orderModalData = null;
    },
    clearConstructor: (state) => {
      state = {
        ...initialState,
        constructorItems: initialState.constructorItems
      };
    },
    moveIngredient: (
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        moveTo: 'up' | 'down';
      }>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.ingredient.id
      );
      const ingredient = state.constructorItems.ingredients[index];
      if (action.payload.moveTo === 'up') {
        if (index > 0) {
          state.constructorItems.ingredients[index] =
            state.constructorItems.ingredients[index - 1];
          state.constructorItems.ingredients[index - 1] = ingredient;
        }
      } else if (action.payload.moveTo === 'down') {
        if (index < state.constructorItems.ingredients.length - 1) {
          state.constructorItems.ingredients[index] =
            state.constructorItems.ingredients[index + 1];
          state.constructorItems.ingredients[index + 1] = ingredient;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.error = null;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    getConstructorState: (state) => state
  }
});

export const { getConstructorState } = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  resetModalData,
  clearConstructor,
  moveIngredient
} = constructorSlice.actions;
