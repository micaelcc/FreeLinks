import { IUsersRepository, UserDTO } from 'data/protocols/users-repository';
import { User } from 'domain/usecases/register-user';

import { MongoHelper } from '../helpers/mongo-helper';

class UsersMongoRepository implements IUsersRepository {
  async save(data: UserDTO): Promise<User> {
    const usersCollection = MongoHelper.getCollection('users');

    const { insertedId } = await usersCollection.insertOne({
      name: data.name,
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      links: data.links,
    });

    const { _id, ...userWithoutId } = await usersCollection.findOne({
      _id: insertedId,
    });

    return {
      id: _id.toString(),
      ...userWithoutId,
    } as User;
  }

  async findByEmail(email: string): Promise<User[] | undefined> {
    return new Promise(resolve => resolve(null));
  }

  async findByNick(nickname: string): Promise<User[] | undefined> {
    return new Promise(resolve => resolve(null));
  }
}

export { UsersMongoRepository };
