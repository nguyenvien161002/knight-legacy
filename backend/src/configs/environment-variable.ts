import * as path from 'path';
import * as Joi from 'joi';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';

config({ path: path.resolve('./.env') });
const logger = new Logger('ENV');
export const env = {
  port: process.env.PORT,
  mongodb: {
    stringConnect: process.env.MONGODB_STRING_CONNECT,
  },
  auth: {
    secret: process.env.SECRET_JWT,
    secretRefresh: process.env.SECRET_JWT_REFRESH,
  },
  email: {
    host: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASSWORD,
    port: +process.env.EMAIL_PORT,
    user: process.env.EMAIL_USERNAME,
  },
};

const envSchema = Joi.object({
  PORT: Joi.number().port().default(9090),
  SECRET_JWT: Joi.string().required(),
  SECRET_JWT_REFRESH: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_PORT: Joi.number().default(587),
  EMAIL_USERNAME: Joi.string().required(),
});

envSchema
  .validateAsync(process.env, {
    abortEarly: false,
    stripUnknown: true,
  })
  .then(() => logger.log('Knight legacy server load variable env successfully'))
  .catch((error) => {
    logger.error('Knight legacy server load variable env fail');
    console.table(
      error.details.map((err) => ({ msg: err.message, path: err.path })),
    );
    process.exit();
  });
