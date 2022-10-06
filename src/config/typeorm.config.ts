import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*.ts'],
  };
};
