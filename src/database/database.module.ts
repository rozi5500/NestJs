import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
      }),
      load: [TypeOrmConfig],
    }),
    TypeOrmModule.forRoot(TypeOrmConfig()),
  ],
})
export class DatabaseModule {}
