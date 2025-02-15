import { expect, test, describe } from '@jest/globals';

import { server } from '../../../../mocks/node';

import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  initialState,
  constructorSlice,
  constructorReducer,
  getConstructorState,
  addIngredient,
  removeIngredient,
  resetModalData,
  clearConstructor,
  moveIngredient
} from '../slice';
import { orderBurgerThunk } from '../actions';
import { orderBurgerApi } from '@api';

import store from '../../../store';

import acceptedOrderMock from '../../../../mocks/responses/accepted-order.json';
import orderDataMock from '../../../../mocks/requests/order.json';
import ingredientsMock from '../../../../mocks/responses/ingredients.json';

describe('Проверяем слайс constructor', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  beforeAll(async () => {
    // eslint-disable-next-line
    global.document = {
      cookie: 'accessToken=123,refreshToken=456'
    } as any;
  });

  test('тест заказа товара', async () => {
    const expectedResult = acceptedOrderMock;
    const store2 = configureStore({ reducer: combineSlices(constructorSlice) });

    const result = await orderBurgerApi(orderDataMock); // тест запроса напрямую
    expect(result).toEqual(expectedResult);

    await store2.dispatch(orderBurgerThunk(orderDataMock)); // тест запроса через санку
    const { orderModalData } = store2.getState().burgerConstructor;
    expect(orderModalData).toEqual(expectedResult.order);
  });

  test('тест getConstructorState', async () => {
    const ingredients = getConstructorState(store.getState());
    expect(ingredients).toEqual(initialState);
  });

  test('тест addIngredient', async () => {
    const bun = ingredientsMock.data[0];
    const newIngredient = ingredientsMock.data[1];

    const bunRes = { ...bun, id: null };
    const ingredientRes = { ...newIngredient, id: null };
    expect(store.getState().burgerConstructor.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
    const resBun = store.dispatch(addIngredient(bun));
    expect({ ...resBun.payload, id: null }).toEqual(bunRes);
    expect({
      ...store.getState().burgerConstructor.constructorItems.bun,
      id: null
    }).toEqual(bunRes);

    const resIngredient = store.dispatch(addIngredient(newIngredient));
    expect({ ...resIngredient.payload, id: null }).toEqual(ingredientRes);
    expect(
      store
        .getState()
        .burgerConstructor.constructorItems.ingredients.map((i) => ({
          ...i,
          id: null
        }))
    ).toEqual([ingredientRes]);
    store.dispatch(
      removeIngredient(
        store.getState().burgerConstructor.constructorItems.ingredients[0]
      )
    );
  });

  test('тест removeIngredient', async () => {
    const getState = () => store.getState();

    expect(
      getState().burgerConstructor.constructorItems.ingredients.length
    ).toBe(0);
    store.dispatch(addIngredient(ingredientsMock.data[1])); // добавить main
    expect(
      getState().burgerConstructor.constructorItems.ingredients.length
    ).toBe(1);
    store.dispatch(
      removeIngredient(
        getState().burgerConstructor.constructorItems.ingredients[0]
      )
    ); // удалить main
    expect(
      getState().burgerConstructor.constructorItems.ingredients.length
    ).toBe(0);
  });

  test('тест resetModalData', async () => {
    const getState = () => store.getState();

    expect(getState().burgerConstructor.orderModalData).toBe(null);
    await store.dispatch(orderBurgerThunk(orderDataMock)); // запрос через санку
    expect(getState().burgerConstructor.orderModalData).not.toBe(null);
    store.dispatch(resetModalData());
    expect(getState().burgerConstructor.orderModalData).toBe(null);
  });

  test('тест clearConstructor', () => {
    store.dispatch(clearConstructor());
    expect(store.getState().burgerConstructor).toEqual(initialState);
  });

  test('тест moveIngredient', () => {
    const getState = () => store.getState();

    store.dispatch(addIngredient(ingredientsMock.data[1]));
    store.dispatch(addIngredient(ingredientsMock.data[2]));
    store.dispatch(addIngredient(ingredientsMock.data[3]));
    expect(
      getState().burgerConstructor.constructorItems.ingredients.map(
        (i) => i._id
      )
    ).toEqual(ingredientsMock.data.slice(1, 4).map((i) => i._id));
    store.dispatch(
      moveIngredient({
        ingredient:
          getState().burgerConstructor.constructorItems.ingredients[0],
        moveTo: 'up'
      })
    ); // остаются на месте
    store.dispatch(
      moveIngredient({
        ingredient:
          getState().burgerConstructor.constructorItems.ingredients[2],
        moveTo: 'down'
      })
    ); // остаются на месте
    expect(
      getState().burgerConstructor.constructorItems.ingredients.map(
        (i) => i._id
      )
    ).toEqual(ingredientsMock.data.slice(1, 4).map((i) => i._id));

    store.dispatch(
      moveIngredient({
        ingredient:
          getState().burgerConstructor.constructorItems.ingredients[0],
        moveTo: 'down'
      })
    );
    expect(
      getState().burgerConstructor.constructorItems.ingredients[1]._id
    ).toEqual(ingredientsMock.data[1]._id);
    store.dispatch(
      moveIngredient({
        ingredient:
          getState().burgerConstructor.constructorItems.ingredients[2],
        moveTo: 'up'
      })
    );
    expect(
      getState().burgerConstructor.constructorItems.ingredients[1]._id
    ).toEqual(ingredientsMock.data[3]._id);
  });
});
