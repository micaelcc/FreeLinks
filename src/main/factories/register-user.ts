import { RegisterUser } from 'data/usecases/register-user';
import { IRegisterUser } from 'domain/usecases/register-user';
import { BcryptAdapter } from 'infra/criptography/bcrypt-adapter';
import { UsersMongoRepository } from 'infra/db/mongodb/users-repository/users';

export default (): IRegisterUser => {
  const usersRepository = new UsersMongoRepository();
  const encrypter = new BcryptAdapter(12);
  return new RegisterUser(usersRepository, encrypter);
};
