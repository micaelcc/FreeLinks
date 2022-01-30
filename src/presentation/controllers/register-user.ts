import { IRegisterUser } from 'domain/usecases/register-user';
import { IController } from 'presentation/protocols/base-controller';

import { badRequest, clientError, ok } from '../helpers/http-codes';
import { HttpRequest, HttpResponse } from '../protocols/http';

class RegisterUserController implements IController {
  constructor(private readonly registerUser: IRegisterUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = [
        'name',
        'nickname',
        'email',
        'password',
        'passwordConfirmation',
      ];

      // eslint-disable-next-line no-restricted-syntax
      for (const field of fields) {
        if (!request.body[field]) {
          return badRequest(new Error(`Missing param: ${field}`));
        }
      }

      await this.registerUser.execute(request.body);

      return ok();
    } catch (error) {
      return clientError(error);
    }
  }
}

export { RegisterUserController };
