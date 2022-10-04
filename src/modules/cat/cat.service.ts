import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto, UpdateCatDto } from './dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
    @InjectRepository(Owner) private personRepository: Repository<Owner>,
    private connection: Connection,
  ) {}

  async createCat(catRequest: CreateCatDto): Promise<Cat> {
    const owners = await Promise.all(
      catRequest.owners.map((name) => this.preloadPersonByName(name)),
    );

    const catToSave = this.catRepository.create({
      ...catRequest,
      owners,
    });
    return this.catRepository.save(catToSave);
  }

  findAllCats(queryOptions: PaginationDto): Promise<Cat[]> {
    const { offset, limit } = queryOptions;

    return this.catRepository.find({
      relations: ['owners'],
      skip: offset,
      take: limit,
    });
  }

  async findOneCat(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({
      where: { id },
      relations: ['owners'],
    });

    if (!cat) throw new NotFoundException(`Cat #${id} is not found`);
    return cat;
  }

  async updateCat(id: number, catBody: UpdateCatDto): Promise<Cat | Error> {
    const owners =
      catBody.owners &&
      (await Promise.all(
        catBody.owners.map((name) => this.preloadPersonByName(name)),
      ));

    const cat = await this.catRepository.preload({
      id,
      ...catBody,
      owners,
    });

    if (!cat) throw new NotFoundException(`Cat #${id} is not found`);

    return this.catRepository.save(cat);
  }

  async deleteCat(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }

  async recommendCat(cat: Cat) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      cat.recommendations++;

      const recommendEvent = new Event();

      recommendEvent.name = 'recommend_cat';
      recommendEvent.type = 'cat';
      recommendEvent.payload = { catId: cat.id };

      await queryRunner.manager.save(cat);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadPersonByName(name: string): Promise<Owner> {
    const existingPerson = await this.personRepository.findOne({
      where: { name },
    });

    if (existingPerson) return existingPerson;

    return this.personRepository.create({ name });
  }
}
