/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_USER: string;
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: string;
  }
}
