import { IRegisterUser, UserModel } from '../../domain/usecases/register-user';
import { AppError } from '../../presentation/errors/app-error';
import { IEncrypter } from '../protocols/encrypter';
import { IUsersRepository } from '../protocols/users-repository';

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
  }: UserModel): Promise<void> {
    if (password !== passwordConfirmation) {
      throw new AppError('Password confirmation fails', 400);
    }

    const nickAlreadyExists = await this.usersRepository.findByNick(nickname);

    if (nickAlreadyExists) {
      throw new AppError('Nickname already exists', 409);
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email already exists', 409);
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
  }
}

export { RegisterUser };
