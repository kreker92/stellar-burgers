import { expect, test, describe } from '@jest/globals';

import { server } from '../../../../mocks/node';

import {
  orderSlice,
  getOrdersThunk,
  // actions
  addOrder,
  removeOrder,
  // selectors
  getOrders,
  getTotal,
  getTotalToday,
  initialStateOrder as initialState
} from '../order-slice';

import store from '../../../store';

import ordersMock from '../../../../mocks/responses/orders.json';

describe('Проверяем слайс order', () => {
  test('getOrdersThunk fulfilled', () => {
    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: ordersMock.orders
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: ordersMock.orders
    });
  });

  test('getOrdersThunk pending', () => {
    const action = {
      type: getOrdersThunk.pending.type,
      payload: ordersMock.orders
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('getOrdersThunk rejected', () => {
    const msgText = 'Ошибка';
    const action = {
      type: getOrdersThunk.rejected.type,
      payload: ordersMock.orders,
      error: msgText
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: msgText
    });
  });

  test('тест getOrders', async () => {
    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: ordersMock.orders
    };
    const state = orderSlice.reducer(initialState, action);

    const orders = getOrders({ orders: state });
    expect(orders.length).toBe(8);
  });

  test('тест getTotal', () => {
    const total = getTotal(store.getState());
    expect(total).toBe(0);
  });

  test('тест getTotalToday', () => {
    const totalToday = getTotalToday(store.getState());
    expect(totalToday).toBe(0);
  });

  test('тест addOrder', async () => {
    store.dispatch(addOrder(ordersMock.orders[0]));
    const orders = getOrders(store.getState());
    expect(orders.length).toBe(1);
    expect(orders[orders.length - 1]).toEqual(ordersMock.orders[0]);
  });

  test('тест removeOrder', async () => {
    store.dispatch(removeOrder(ordersMock.orders[0]._id));
    const orders = getOrders(store.getState());
    expect(orders.length).toBe(0);
  });
});
