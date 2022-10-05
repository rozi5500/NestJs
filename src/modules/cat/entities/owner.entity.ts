import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Cat, (cat) => cat.owners)
  cat: Cat[];
}
