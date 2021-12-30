import { IRegisterUser, User, UserModel } from 'domain/usecases/register-user';

class RegisterUser implements IRegisterUser {
  async execute(data: UserModel): Promise<boolean> {
    return false;
  }
}

export { RegisterUser };
