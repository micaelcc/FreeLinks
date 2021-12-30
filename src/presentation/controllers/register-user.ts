import { badRequest } from 'presentation/helpers/http-codes';
import { HttpRequest, HttpResponse } from 'presentation/protocols/http';

class RegisterUserController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name) {
      return badRequest(new Error('Missing param: name'));
    }

    if (!request.body.nickname) {
      return badRequest(new Error('Missing param: nickname'));
    }

    if (!request.body.email) {
      return badRequest(new Error('Missing param: email'));
    }

    return undefined;
  }
}

export { RegisterUserController };
