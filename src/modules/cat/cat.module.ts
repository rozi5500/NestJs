import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Owner } from './entities/owner.entity';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Owner, Event])],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
