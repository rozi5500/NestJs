import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatService } from './cat.service';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto, CreateCatDto } from './dto/request';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('cats')
@Controller('cats')
export class CatController {
  private readonly logger: LoggerService;

  constructor(private catService: CatService) {
    this.logger = new Logger(CatController.name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCat(@Body() catRequest: CreateCatDto) {
    this.logger.log('createCat');
    return this.catService.createCat(catRequest);
  }

  @Get()
  @Public()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async getAllCats(@Query() queryPagination: PaginationDto): Promise<Cat[]> {
    this.logger.log('getAllCats');
    return this.catService.findAllCats(queryPagination);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOneCat(@Param('id') id: number): Promise<Cat> {
    this.logger.log('getOneCat');
    return this.catService.findOneCat(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCatById(@Param('id') id: number, @Body() catBody: UpdateCatDto) {
    this.logger.log('updateCatById');
    return this.catService.updateCat(id, catBody);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneCat(@Param('id') id: number): Promise<void> {
    this.logger.log('deleteCat');
    return this.catService.deleteCat(id);
  }
}
