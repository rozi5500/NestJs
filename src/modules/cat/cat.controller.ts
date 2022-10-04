import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatService } from './cat.service';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto, CreateCatDto } from './dto/request';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('cats')
@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCat(@Body() catRequest: CreateCatDto) {
    return this.catService.createCat(catRequest);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllCats(@Query() queryPagination: PaginationDto): Promise<Cat[]> {
    return this.catService.findAllCats(queryPagination);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneCat(@Param('id') id: number): Promise<Cat> {
    return this.catService.findOneCat(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateCatById(@Param('id') id: number, @Body() catBody: UpdateCatDto) {
    return this.catService.updateCat(id, catBody);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOneCat(@Param('id') id: number): Promise<void> {
    return this.catService.deleteCat(id);
  }
}
