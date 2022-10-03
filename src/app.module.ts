import { Module } from '@nestjs/common';
import { CatModule } from './modules/cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: 'postgres',
      password: 'root',
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    CatModule,
  ],
})
export class AppModule {}
