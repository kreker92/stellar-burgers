require('dotenv').config();

const URL = process.env.BURGER_API_URL;

import tokenResponse from './responses/token.json';
import ingredientsResponse from './responses/ingredients.json';
import acceptedOrderResponse from './responses/accepted-order.json';
import userResponse from './responses/user.json';
import logoutResponse from './responses/logout.json';
import registerResponse from './responses/register.json';
import allOrdersResponse from './responses/allOrders.json';
import ordersResponse from './responses/orders.json';

import {
  http, // модуль для мокирования сетевых запросов
  HttpResponse // класс ответа на запрос
} from 'msw';

if (!URL) {
  throw new Error('BURGER_API_URL is not defined');
}

export const handlers = [
  http.get(`${URL}/auth/token`, () => HttpResponse.json(tokenResponse)),
  http.get(`${URL}/ingredients`, () => HttpResponse.json(ingredientsResponse)),
  http.post(`${URL}/orders`, () => HttpResponse.json(acceptedOrderResponse)),

  http.post(`${URL}/auth/login`, () => HttpResponse.json(userResponse)),
  http.post(`${URL}/auth/logout`, () => HttpResponse.json(logoutResponse)),
  http.patch(`${URL}/auth/user`, () =>
    HttpResponse.json({
      ...userResponse,
      user: { email: userResponse.user.email, name: 'qwe' }
    })
  ),
  http.get(`${URL}/auth/user`, () => HttpResponse.json(registerResponse)),
  http.get(`${URL}/auth/register`, () => HttpResponse.json(registerResponse)),

  http.get(`${URL}/orders/all`, () => HttpResponse.json(allOrdersResponse)),
  http.get(`${URL}/orders`, () => HttpResponse.json(ordersResponse))

];
