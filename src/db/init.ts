import Shorted from './models/Shorted';

const isDev = process.env.NODE_ENV === 'dev';

console.log(process.env.DB_HOST);

export const dbInit = () => {
  Shorted.sync({ alter: isDev, force: isDev });
};
