import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './models/cat.schema';
import { Owner, OwnerSchema } from './models/owner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Owner.name, schema: OwnerSchema },
    ]),
  ],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
