import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/getUser.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/deleteCategory.dto';
import { GetById } from './dto/getById.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
//@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  //checked
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  //Get all category that belongs to the resturant
  @Get(':restaurantId')
  //checked
  findAll(@Param() getById: GetById) {
    return this.categoryService.findAll(getById);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  @Put()
  //checked
  update(@Body() updateCategoryDto: UpdateCategoryDto, @GetUser() user) {
    return this.categoryService.update(updateCategoryDto, user);
  }

  @Delete(':categoryId')
  remove(
    @Param('categoryId') deleteCategoryDto: DeleteCategoryDto,
    @GetUser() user,
  ) {
    return this.categoryService.delete(deleteCategoryDto, user);
  }
}
