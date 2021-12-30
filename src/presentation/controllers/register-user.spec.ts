import { RegisterUserController } from './register-user';

describe('Register User', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new RegisterUserController();

    const httpRequest = {
      body: {
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.data).toEqual(new Error('Missing param: name'));
  });

  test('Should return 400 if no nickname is provided', async () => {
    const sut = new RegisterUserController();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.data).toEqual(new Error('Missing param: nickname'));
  });

  test('Should return 400 if no email is provided', async () => {
    const sut = new RegisterUserController();

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.data).toEqual(new Error('Missing param: email'));
  });

  test('Should return 400 if no password is provided', async () => {
    const sut = new RegisterUserController();

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.data).toEqual(new Error('Missing param: password'));
  });

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const sut = new RegisterUserController();

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.data).toEqual(
      new Error('Missing param: passwordConfirmation'),
    );
  });

  test('Should return 400 if password confirmation fails', async () => {
    const sut = new RegisterUserController();

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.data).toEqual(
      new Error('Invalid param: passwordConfirmation'),
    );
  });
});
