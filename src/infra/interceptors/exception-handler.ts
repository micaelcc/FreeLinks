import { Response, Request, NextFunction } from 'express';

import { AppError } from '../../presentation/errors/app-error';

class ExceptionHandler {
  static handle(
    err: Error,
    _request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ): Response {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`,
    });
  }
}

export { ExceptionHandler };
