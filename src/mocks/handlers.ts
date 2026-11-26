import { http, HttpResponse } from 'msw';

import { environment } from '@/config/environment';

import { users } from './data';

export const api = (path: string) => `${environment.apiBaseUrl}${path}`;

export const handlers = [
  http.get(api('/users'), () => HttpResponse.json(users)),
];
