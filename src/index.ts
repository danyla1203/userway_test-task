import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { dbInit } from './db/init';
import router from './router';
import { errorHandler } from './middlewares/errorHandler';
import { redirectToOrigin } from './shortener/middlewares/redirectToOrigin';

dotenv.config();

dbInit();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/:code', redirectToOrigin);
app.use('/api/v1', router);
app.use(errorHandler);

try {
  app.listen(process.env.PORT, async () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
} catch (error) {
  console.log(`Error occurred: ${error}`);
}
