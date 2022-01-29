import { Router } from 'express';

import { adaptRoute } from '../adapters/express-route-adapter';
import { makeRegisterUserController } from '../factories/register-user';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeRegisterUserController()));
};
