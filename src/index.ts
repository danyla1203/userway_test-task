import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import dbInit from './db/init';

dotenv.config();

dbInit();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async (_: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: `Endpoints available at http://localhost:${process.env.PORT}/api/v1`,
  });
});

try {
  app.listen(process.env.PORT, async () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
} catch (error) {
  console.log(`Error occurred: ${error}`);
}
