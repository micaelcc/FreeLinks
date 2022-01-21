import request from 'supertest';

import { app } from '../config/app';

describe('Users Routes', () => {
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
