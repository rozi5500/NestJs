import { Module } from '@nestjs/common';
import { CatModule } from './modules/cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), CatModule],
})
export class AppModule {}
