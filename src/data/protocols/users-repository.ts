import { User, UserModel } from 'domain/usecases/register-user';

export type UserDTO = UserModel & {
  links: string[];
};

export interface IUsersRepository {
  findByNick(nick: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(data: UserDTO): Promise<User>;
}
