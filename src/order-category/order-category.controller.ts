import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderCategoryService } from './order-category.service';
import { CreateOrderCategoryDto } from './dto/create-order-category.dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { GetUser } from 'src/auth/getUser.decorator';
import { DeleteCategoryDto } from 'src/category/dto/deleteCategory.dto';
import { DeleteOrderCategoryDto } from './dto/delete-order-category.dto';
import { GetByIdDto } from './dto/get-by-id.dto';

@ApiTags('Order category')
@Controller('order-category')
export class OrderCategoryController {
  constructor(private readonly orderCategoryService: OrderCategoryService) {}

  @Post()
  create(@Body() createOrderCategoryDto: CreateOrderCategoryDto) {
    return this.orderCategoryService.create(createOrderCategoryDto);
  }

  //find all order category that belongs to meal
  @Get('checkBox/:mealId')
  findAllCleckBox(@Param() getByIdDto: GetByIdDto) {
    return this.orderCategoryService.findOne(getByIdDto.mealId, true);
  }

  @Get('redioButton/:mealId')
  findAllRedioButton(@Param() getByIdDto: GetByIdDto) {
    return this.orderCategoryService.findOne(getByIdDto.mealId, false);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderCategoryService.findOne(+id);
  // }

  @Put()
  update(
    @Body() updateOrderCategoryDto: UpdateOrderCategoryDto,
    @GetUser() user,
  ) {
    return this.orderCategoryService.update(updateOrderCategoryDto, user);
  }

  @Delete(':mealId')
  delete(
    @Param('mealId') deleteCategoryDto: DeleteOrderCategoryDto,
    @GetUser() user,
  ) {
    return this.orderCategoryService.delete(deleteCategoryDto, user);
  }
}
