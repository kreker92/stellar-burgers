import { expect, test, describe } from '@jest/globals';

import { server } from '../../../../mocks/node';

import {
  getOrdersThunk,
  // actions
  addOrder,
  removeOrder,
  // selectors
  getOrders,
  getTotal,
  getTotalToday
} from '../order-slice';

import store from '../../../store';

import ordersMock from '../../../../mocks/responses/orders.json';

describe('Проверяем слайс order', () => {
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
    await store.dispatch(getOrdersThunk());
  });

  test('тест getOrders', async () => {
    const orders = getOrders(store.getState());
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
    expect(orders.length).toBe(9);
    expect(orders[orders.length - 1]).toEqual(ordersMock.orders[0]);
  });

  test('тест removeOrder', async () => {
    store.dispatch(removeOrder(ordersMock.orders[1]._id));
    const orders = getOrders(store.getState());
    expect(orders.length).toBe(8);
  });
});
