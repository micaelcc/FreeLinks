import { HttpResponse } from 'presentation/protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: error,
});

export const ok = (): HttpResponse => ({
  statusCode: 200,
  data: {},
});
