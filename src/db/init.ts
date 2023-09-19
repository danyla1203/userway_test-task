import Shorted from './models/Shorted';

const isTest = process.env.NODE_ENV === 'test';
export const dbInit = async () => {
  await Shorted.sync({ alter: isTest, force: isTest });
};
