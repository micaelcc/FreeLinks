import express from 'express';

import { ExceptionHandler } from '../../infra/interceptors/exception-handler';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';

const app = express();

setupMiddlewares(app);
setupRoutes(app);

app.use(ExceptionHandler.handle);

export { app };
