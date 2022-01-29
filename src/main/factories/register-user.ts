import { RegisterUser } from '../../data/usecases/register-user';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { UsersMongoRepository } from '../../infra/db/mongodb/users-repository/users';
import { RegisterUserController } from '../../presentation/controllers/register-user';

export const makeRegisterUserController = (): RegisterUserController => {
  const usersRepository = new UsersMongoRepository();
  const encrypter = new BcryptAdapter(12);
  const registerUserService = new RegisterUser(usersRepository, encrypter);

  return new RegisterUserController(registerUserService);
};
