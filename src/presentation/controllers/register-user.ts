import { IRegisterUser } from 'domain/usecases/register-user';
import { IController } from 'presentation/protocols/base-controller';

import { badRequest, serverError, ok } from '../helpers/http-codes';
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

      const { password, passwordConfirmation } = request.body;

      // eslint-disable-next-line no-restricted-syntax
      for (const field of fields) {
        if (!request.body[field]) {
          return badRequest(new Error(`Missing param: ${field}`));
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new Error('Invalid param: passwordConfirmation'));
      }

      await this.registerUser.execute(request.body);

      return ok();
    } catch (error) {
      return serverError(new Error());
    }
  }
}

export { RegisterUserController };
