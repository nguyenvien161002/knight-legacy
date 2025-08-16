import { env } from './environment-variable';

export const dataSourceConfigMongoDB = {
  connect: env.mongodb.stringConnect,
};
