import { Injectable } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/request';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './models/cat.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async createCat(catRequest: CreateCatDto): Promise<Cat> {
    return this.catModel.create(catRequest);
  }

  async findAllCats(): Promise<Cat[]> {
    return this.catModel.find();
  }

  findOneCat(id: number) {}

  updateCat(id: string, catBody: UpdateCatDto) {}

  deleteCat(id: number): void {}
}
