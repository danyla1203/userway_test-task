import Shorted from './models/Shorted';

const isDev = process.env.NODE_ENV === 'dev';
export const dbInit = async () => {
  await Shorted.sync({ alter: isDev, force: isDev, logging: isDev });
};
