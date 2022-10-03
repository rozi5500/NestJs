import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto, UpdateCatDto } from './dto/request';

@Injectable()
export class CatService {
  private cats: Cat[] = [
    {
      id: 1,
      age: 4,
      name: 'Mikasa',
      owners: ['Nick', 'Andrew'],
    },
    {
      id: 2,
      age: 1,
      name: 'Dolhi',
      owners: ['Hp, Valif'],
    },
    {
      id: 3,
      age: 6,
      name: 'Vinga',
      owners: ['Chop', 'Vjlink'],
    },
  ];

  createCat(catRequest: CreateCatDto) {
    this.cats.push(catRequest);
    return this.findAllCats();
  }

  findAllCats(queryOptions?): Cat[] {
    return this.cats;
  }

  findOneCat(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  updateCat(id: string, catBody: UpdateCatDto) {}

  deleteCat(id: number): void {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    this.cats.splice(catIndex, 1);
  }
}
