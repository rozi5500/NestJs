module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'nick-nest',
  entities: ['dist/**/*.entity.ts'],
  migrations: ['dist/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
