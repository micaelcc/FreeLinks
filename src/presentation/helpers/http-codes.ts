import { AppError } from 'presentation/errors/app-error';
import { HttpResponse } from 'presentation/protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: error,
});

export const clientError = (error: AppError): HttpResponse => ({
  statusCode: error.statusCode ? error.statusCode : 500,
  data: {
    status: 'Error',
    message: error.message,
  },
});

export const ok = (): HttpResponse => ({
  statusCode: 200,
  data: {},
});
