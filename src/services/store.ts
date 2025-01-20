import {
  combineReducers,
  combineSlices,
  configureStore
} from '@reduxjs/toolkit';
import {
  registerReducer,
  orderReducer,
  feedReducer,
  ingredientReducer,
  orderSlice,
  feedSlice,
  ingredientSlice,
  userReducer,
  userSlice,
  registerSlice
} from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from './slices/constructor/slice';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера
const rootReducer = combineSlices(
  userSlice,
  registerSlice,
  orderSlice,
  feedSlice,
  ingredientSlice,
  constructorSlice
);
// const rootReducer = combineReducers({
//   [userSlice.reducerPath]: userReducer,
//   register: registerReducer,
//   orders: orderReducer,
//   feed: feedReducer,
//   ingredients: ingredientReducer
// });

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
