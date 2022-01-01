/* eslint-disable max-classes-per-file */
import { IEncrypter } from 'data/protocols/encrypter';
import { IUsersRepository } from 'data/protocols/users-repository';
import { User } from 'domain/usecases/register-user';

import { RegisterUser } from './register-user';

type SutTypes = {
  sut: RegisterUser;
  usersRepositoryStub: IUsersRepository;
  encrypterStub: IEncrypter;
};

const makeEncrypterStub = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }

  return new EncrypterStub();
};

const makeUsersRepositoryStub = (): IUsersRepository => {
  class UsersRepository implements IUsersRepository {
    async findByNick(nick: string): Promise<User[] | undefined> {
      return undefined;
    }

    async findByEmail(email: string): Promise<User[] | undefined> {
      return undefined;
    }
  }

  return new UsersRepository();
};

const makeSut = (): SutTypes => {
  const usersRepositoryStub = makeUsersRepositoryStub();
  const encrypterStub = makeEncrypterStub();
  const sut = new RegisterUser(usersRepositoryStub, encrypterStub);

  return {
    sut,
    usersRepositoryStub,
    encrypterStub,
  };
};
describe('RegisterUser', () => {
  test('Should return false if password confirmation fails', async () => {
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

    const httpResponse = await sut.execute(httpRequest.body);

    expect(httpResponse).toBe(false);
  });

  test('Should return false if nickname already exists', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    const fakeUser = {
      id: 'user_id',
      name: 'user_name',
      nickname: 'invalid_nickname',
      email: 'user_email@mail.com',
      password: 'hashed_password',
    };

    jest
      .spyOn(usersRepositoryStub, 'findByNick')
      .mockReturnValueOnce(new Promise(resolve => resolve([fakeUser])));

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'invalid_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.execute(httpRequest.body);

    expect(httpResponse).toBe(false);
  });

  test('Should return false if email already exists', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    const fakeUser = {
      id: 'user_id',
      name: 'user_name',
      nickname: 'user_nickname',
      email: 'invalid_email@mail.com',
      password: 'hashed_password',
    };

    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(new Promise(resolve => resolve([fakeUser])));

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.execute(httpRequest.body);

    expect(httpResponse).toBe(false);
  });

  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt');

    const httpRequest = {
      body: {
        name: 'any_name',
        nickname: 'any_nickname',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.execute(httpRequest.body);

    expect(encrypterSpy).toHaveBeenCalledWith('any_password');
  });
});
