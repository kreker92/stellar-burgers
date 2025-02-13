import { expect, test, describe } from '@jest/globals';

import { server } from '../../../../mocks/node';

import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  getIngredientsThunk,
  ingredientSlice,
  getIngredients,
  getIngredientsLoading,
  getIngredientsTypeBuns,
  getIngredientsTypeMains,
  getIngredientsTypeSauces,
  getIngredientById
} from '../../ingredients';
import { getIngredientsApi } from '@api';

import store from '../../../store';

import ingredientsMock from '../../../../mocks/responses/ingredients.json';

describe('Проверяем слайс ingredients', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  beforeAll(async () => {
    await store.dispatch(getIngredientsThunk()); // запрос через санку
  });

  const expectedResult = ingredientsMock.data;
  test('тест загрузки ингридиентов', async () => {
    const store2 = configureStore({ reducer: combineSlices(ingredientSlice) });

    const result = await getIngredientsApi(); // тест запроса напрямую
    expect(result).toEqual(expectedResult);

    await store2.dispatch(getIngredientsThunk()); // тест запроса через санку
    const { ingredients } = store2.getState().ingredients;
    expect(ingredients).toEqual(expectedResult);
  });

  test('тест getIngredients', async () => {
    const ingredients = getIngredients(store.getState());
    expect(ingredients).toEqual(ingredientsMock.data);
  });
  test('тест getIngredientsLoading', async () => {
    const ingredients = getIngredientsLoading(store.getState());
    expect(ingredients).toBe(false);
  });
  test('тест getIngredientsTypeBuns', async () => {
    const ingredients = getIngredientsTypeBuns(store.getState());
    expect(ingredients).toEqual(
      ingredientsMock.data.filter((i) => i.type === 'bun')
    );
  });
  test('тест getIngredientsTypeMains', async () => {
    const ingredients = getIngredientsTypeMains(store.getState());
    expect(ingredients).toEqual(
      ingredientsMock.data.filter((i) => i.type === 'main')
    );
  });
  test('тест getIngredientsTypeSauces', async () => {
    const ingredients = getIngredientsTypeSauces(store.getState());
    expect(ingredients).toEqual(
      ingredientsMock.data.filter((i) => i.type === 'sauce')
    );
  });
  test('тест getIngredientById', async () => {
    const ingredients = getIngredientById(
      store.getState(),
      '643d69a5c3f7b9001cfa093e'
    );
    expect(ingredients).toEqual(ingredientsMock.data[2]);
  });
});
