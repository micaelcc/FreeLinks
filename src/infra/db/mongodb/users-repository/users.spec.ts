import { MongoHelper } from '../helpers/mongo-helper';
import { UsersMongoRepository } from './users';

describe('Users Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const usersCollection = await MongoHelper.getCollection('users');

    usersCollection.deleteMany({});
  });

  test('Should return an account on success', async () => {
    const sut = new UsersMongoRepository();

    const user = await sut.save({
      name: 'any_name',
      nickname: 'any_nickname',
      email: 'any_email',
      password: 'any_password',
      links: [],
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(user.name).toEqual('any_name');
    expect(user.nickname).toEqual('any_nickname');
    expect(user.email).toEqual('any_email');
    expect(user.password).toEqual('any_password');
    expect(user.links).toEqual([]);
  });
});
