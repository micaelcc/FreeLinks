import { IEncrypter } from 'data/protocols/encrypter';
import { IUsersRepository } from 'data/protocols/users-repository';
import { IRegisterUser, UserModel } from 'domain/usecases/register-user';

class RegisterUser implements IRegisterUser {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly encrypter: IEncrypter,
  ) {}

  async execute({
    name,
    nickname,
    email,
    password,
    passwordConfirmation,
  }: UserModel): Promise<boolean> {
    if (password !== passwordConfirmation) {
      return false;
    }

    const nickAlreadyExists = await this.usersRepository.findByNick(nickname);

    if (nickAlreadyExists) {
      return false;
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      return false;
    }

    const hashedPassword = await this.encrypter.encrypt(password);

    await this.usersRepository.save({
      name,
      email,
      nickname,
      password: hashedPassword,
      passwordConfirmation,
      links: [],
    });

    return true;
  }
}

export { RegisterUser };
