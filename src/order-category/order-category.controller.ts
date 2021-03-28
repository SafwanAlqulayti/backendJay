import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderCategoryService } from './order-category.service';
import { CreateOrderCategoryDto } from './dto/create-order-category.dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';

@Controller('order-category')
export class OrderCategoryController {
  constructor(private readonly orderCategoryService: OrderCategoryService) {}

  @Post()
  create(@Body() createOrderCategoryDto: CreateOrderCategoryDto) {
    return this.orderCategoryService.create(createOrderCategoryDto);
  }

  @Get()
  findAll() {
    return this.orderCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderCategoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderCategoryDto: UpdateOrderCategoryDto) {
    return this.orderCategoryService.update(+id, updateOrderCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderCategoryService.remove(+id);
  }
}
