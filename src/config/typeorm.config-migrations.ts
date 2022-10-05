import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'five',
  password: 'root',
  database: 'nick-nest',
  logging: false,
  synchronize: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*.ts'],
} as DataSourceOptions);
