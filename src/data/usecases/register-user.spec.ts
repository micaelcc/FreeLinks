import { RegisterUser } from './register-user';

describe('RegisterUser', () => {
  test('Should return false if password confirmation fails', async () => {
    const sut = new RegisterUser();

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
});
