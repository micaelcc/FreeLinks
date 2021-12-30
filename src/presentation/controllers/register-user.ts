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

    // eslint-disable-next-line no-restricted-syntax
    for (const field of fields) {
      if (!request.body[field]) {
        return badRequest(new Error(`Missing param: ${field}`));
      }
    }

    return undefined;
  }
}

export { RegisterUserController };
