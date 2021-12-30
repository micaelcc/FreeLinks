import { User } from 'domain/usecases/register-user';

export interface IFindUserByNick {
  find(nick: string): Promise<User[] | undefined>;
}
