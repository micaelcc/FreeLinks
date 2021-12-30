import { IFindUserByNick } from 'data/protocols/register-user-repository';
import { IRegisterUser, User, UserModel } from 'domain/usecases/register-user';

class RegisterUser implements IRegisterUser {
  constructor(private readonly findUserByNick: IFindUserByNick) {}
  async execute(data: UserModel): Promise<boolean> {
    if (data.password !== data.passwordConfirmation) {
      return false;
    }

    const nickAlreadyExists = this.findUserByNick.find(data.nickname);

    if (nickAlreadyExists) {
      return false;
    }

    return true;
  }
}

export { RegisterUser };
