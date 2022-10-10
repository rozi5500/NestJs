import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ description: 'The name of a cat' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The age of a cat' })
  @IsNumber()
  readonly age: number;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly owners: string[];
}
