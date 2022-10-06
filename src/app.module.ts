import { Module } from '@nestjs/common';
import { CatModule } from './modules/cat/cat.module';
import { CatRatingService } from './modules/cat-rating/cat-rating.service';
import { CatRatingModule } from './modules/cat-rating/cat-rating.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CatModule, CatRatingModule, DatabaseModule, CommonModule],
  providers: [CatRatingService],
})
export class AppModule {}
