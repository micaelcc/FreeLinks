import { IRegisterUser, User, UserModel } from 'domain/usecases/register-user';

import { RegisterUserController } from './register-user';

type SutTypes = {
  sut: RegisterUserController;
  registerUserStub: IRegisterUser;
};

const makeSut = (): SutTypes => {
  class RegisterUserStub implements IRegisterUser {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async execute(data: UserModel): Promise<void> {}
  }

  const registerUserStub = new RegisterUserStub();
  const sut = new RegisterUserController(registerUserStub);

  return {
    registerUserStub,
    sut,
  };
};

describe('Register User', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut();

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
    const { sut } = makeSut();

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
    const { sut } = makeSut();

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
    const { sut } = makeSut();

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
    const { sut } = makeSut();

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
    const { sut } = makeSut();

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

  test('Should return 500 if RegisterUser.execute throws', async () => {
    const { sut, registerUserStub } = makeSut();

    jest.spyOn(registerUserStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.data).toEqual(new Error());
  });

  test('Should call RegisterUser with correct values', async () => {
    const { sut, registerUserStub } = makeSut();

    const executeSpy = jest.spyOn(registerUserStub, 'execute');

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
