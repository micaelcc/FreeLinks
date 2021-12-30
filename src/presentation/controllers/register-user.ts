class RegisterUserController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    if (!httpRequest.body.nickname) {
      return {
        statusCode: 400,
        body: new Error('Missing param: nickname'),
      };
    }

    return undefined;
  }
}

export { RegisterUserController };
