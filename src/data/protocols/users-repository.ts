import { User } from 'domain/usecases/register-user';

export interface IUsersRepository {
  findByNick(nick: string): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User[] | undefined>;
}
