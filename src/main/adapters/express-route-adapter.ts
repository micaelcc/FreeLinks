import { Request, Response } from 'express';

import { IController } from '../../presentation/protocols/base-controller';
import { HttpRequest } from '../../presentation/protocols/http';

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.data);
  };
};
