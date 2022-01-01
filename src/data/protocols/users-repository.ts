import { User, UserModel } from 'domain/usecases/register-user';

export interface IUsersRepository {
  findByNick(nick: string): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User[] | undefined>;
  save(data: UserModel): Promise<User>;
}
