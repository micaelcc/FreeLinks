type HttpRequest = {
  body?: any;
};

class RegisterUserController {
  async handle(request: HttpRequest): Promise<any> {
    if (!request.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    if (!request.body.nickname) {
      return {
        statusCode: 400,
        body: new Error('Missing param: nickname'),
      };
    }

    if (!request.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }

    return undefined;
  }
}

export { RegisterUserController };
