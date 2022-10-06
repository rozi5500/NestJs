import { Module } from '@nestjs/common';
import { CatModule } from '../cat/cat.module';
import { CatRatingService } from './cat-rating.service';

@Module({
  imports: [CatModule],
  providers: [CatRatingService],
})
export class CatRatingModule {}
