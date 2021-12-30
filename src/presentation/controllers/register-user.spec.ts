import { RegisterUserController } from './register-user';

describe('Register User', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new RegisterUserController();

    const httpRequest = {
      body: {
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });
});
