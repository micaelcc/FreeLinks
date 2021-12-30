import { HttpRequest, HttpResponse } from 'presentation/protocols/http';

class RegisterUserController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name) {
      return {
        statusCode: 400,
        data: new Error('Missing param: name'),
      };
    }

    if (!request.body.nickname) {
      return {
        statusCode: 400,
        data: new Error('Missing param: nickname'),
      };
    }

    if (!request.body.email) {
      return {
        statusCode: 400,
        data: new Error('Missing param: email'),
      };
    }

    return undefined;
  }
}

export { RegisterUserController };
