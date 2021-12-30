import { IFindUserByNick } from 'data/protocols/register-user-repository';
import { User } from 'domain/usecases/register-user';

import { RegisterUser } from './register-user';

const makeSut = (): any => {
  class FindUserByNickStub implements IFindUserByNick {
    async find(nick: string): Promise<User[] | undefined> {
      return undefined;
    }
  }

  const findUserByNickStub = new FindUserByNickStub();
  const sut = new RegisterUser(findUserByNickStub);

  return {
    sut,
    findUserByNickStub,
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
    const { sut, findUserByNickStub } = makeSut();

    jest.spyOn(findUserByNickStub, 'find').mockReturnValueOnce([
      {
        id: 'user_id',
        name: 'user_name',
        nickname: 'invalid_nickname',
        email: 'user_email@mail.com',
        password: 'hashed_password',
      },
    ]);

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
});
