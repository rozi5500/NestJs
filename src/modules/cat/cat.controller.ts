import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { UpdateCatDto } from './dto/request';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCat(@Body() catRequest) {
    return this.catService.createCat(catRequest);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCats(@Query() queryPagination) {
    return this.catService.findAllCats();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOneCat(@Param('id', ParseIntPipe) id: number) {
    return this.catService.findOneCat(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCatById(
    @Param('id', ParseIntPipe) id: string,
    @Body() catBody: UpdateCatDto,
  ) {
    return this.catService.updateCat(id, catBody);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneCat(@Param('id', ParseIntPipe) id: number): void {
    return this.catService.deleteCat(id);
  }
}
