import { badRequest } from '../helpers/http-codes';
import { HttpRequest, HttpResponse } from '../protocols/http';

class RegisterUserController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
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

    return undefined;
  }
}

export { RegisterUserController };
