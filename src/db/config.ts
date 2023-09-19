import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;
const isDev = process.env.NODE_ENV === 'dev';

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  port: parseInt(dbPort),
  logging: isDev,
});

export default sequelizeConnection;
