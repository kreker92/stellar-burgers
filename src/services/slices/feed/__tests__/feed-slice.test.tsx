import { expect, test, describe } from '@jest/globals';

import { server } from '../../../../mocks/node';

import { getFeeds, getFeedsThunk } from '../feed-slice';

import store from '../../../store';

import allOrdersMock from '../../../../mocks/responses/allOrders.json';

describe('Проверяем слайс register', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  beforeAll(() => {
    // eslint-disable-next-line
    global.document = {
      cookie: 'accessToken=123,refreshToken=456'
    } as any;
  });

  test('тест getFeedsThunk', async () => {
    expect(store.getState().feed.orders.length).toBe(0);
    await store.dispatch(getFeedsThunk());
    expect(store.getState().feed.orders.length).toBe(3);
  });

  test('тест getFeeds', async () => {
    const feeds = getFeeds(store.getState());
    expect(feeds).toEqual(allOrdersMock.orders);
  });
});
