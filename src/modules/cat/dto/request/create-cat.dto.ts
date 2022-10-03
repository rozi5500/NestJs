import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString({ each: true })
  readonly owners: string[];
}
