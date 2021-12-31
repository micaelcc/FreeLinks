import { IUsersRepository } from 'data/protocols/users-repository';
import { IRegisterUser, User, UserModel } from 'domain/usecases/register-user';

class RegisterUser implements IRegisterUser {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(data: UserModel): Promise<boolean> {
    if (data.password !== data.passwordConfirmation) {
      return false;
    }

    const nickAlreadyExists = await this.usersRepository.findByNick(
      data.nickname,
    );

    if (nickAlreadyExists) {
      return false;
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (emailAlreadyExists) {
      return false;
    }

    return true;
  }
}

export { RegisterUser };
