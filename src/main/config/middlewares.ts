import cors from 'cors';
import { json, Express } from 'express';

export default (app: Express): void => {
  app.use(json());
  app.use(cors());
};
