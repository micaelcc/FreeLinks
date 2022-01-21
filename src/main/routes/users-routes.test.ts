import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { app } from '../config/app';

describe('Users Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const usersCollection = MongoHelper.getCollection('users');

    await usersCollection.deleteMany({});
  });

  test('Should return an user on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Micael',
        email: 'micael@mail.com',
        nickname: 'nick',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});
