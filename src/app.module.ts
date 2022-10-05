import { Module } from '@nestjs/common';
import { CatModule } from './modules/cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfigAsync), CatModule],
})
export class AppModule {}
