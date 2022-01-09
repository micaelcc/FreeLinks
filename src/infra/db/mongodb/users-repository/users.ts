import { IUsersRepository } from 'data/protocols/users-repository';
import { User, UserModel } from 'domain/usecases/register-user';

import { MongoHelper } from '../helpers/mongo-helper';

class UsersMongoRepository implements IUsersRepository {
  async save(data: UserModel): Promise<User> {
    const usersCollection = MongoHelper.getCollection('users');

    const { insertedId } = await usersCollection.insertOne(data);

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
