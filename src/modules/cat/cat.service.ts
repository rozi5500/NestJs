import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto, UpdateCatDto } from './dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>) {}

  async createCat(catRequest: CreateCatDto): Promise<Cat> {
    return this.catRepository.save(catRequest);
  }

  findAllCats(queryOptions?): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOneCat(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({ where: { id } });

    if (!cat) throw new NotFoundException(`Cat #${id} is not found`);
    return cat;
  }

  async updateCat(id: number, catBody: UpdateCatDto): Promise<Cat | Error> {
    const cat = await this.catRepository.preload({
      id,
      ...catBody,
    });

    if (!cat) throw new NotFoundException(`Cat #${id} is not found`);

    return this.catRepository.save(cat);
  }

  async deleteCat(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}
