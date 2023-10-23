import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
        JWT_REFRESH_TOKEN_TTL: Joi.string().required(),
        MONGO_URI: Joi.string().required(), // TODO: para prod agregar usuario y pass y ver como construir la url
      }),
    }),
  ],
})
export class ConfigurationModule {}
