import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
import 'dotenv/config';

MongoHelper.connect(process.env.MONGO_URL_CONNECT)
  .then(async () => {
    const { app } = await import('./config/app');

    app.listen(4040, () => {
      console.log(`Server running at http://localhost:4040`);
    });
  })
  .catch(console.error);
