require('dotenv').config();

const URL = process.env.BURGER_API_URL;

import ingredientsResponse from './responses/ingredients.json';

import {
  http, // модуль для мокирования сетевых запросов
  HttpResponse // класс ответа на запрос
} from 'msw';

if (!URL) {
  throw new Error('BURGER_API_URL is not defined');
}

export const handlers = [
  http.get(`${URL}/ingredients`, () => HttpResponse.json(ingredientsResponse))
];
