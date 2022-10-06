import { Injectable } from '@nestjs/common';
import { CatService } from '../cat/cat.service';

@Injectable()
export class CatRatingService {
  constructor(private readonly catService: CatService) {}
}
