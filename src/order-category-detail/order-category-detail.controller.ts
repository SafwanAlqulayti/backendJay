import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderCategoryDetailService } from './order-category-detail.service';
import { CreateOrderCategoryDetailDto } from './dto/create-order-category-detail.dto';
import { UpdateOrderCategoryDetailDto } from './dto/update-order-category-detail.dto';

@Controller('order-category-detail')
export class OrderCategoryDetailController {
  constructor(private readonly orderCategoryDetailService: OrderCategoryDetailService) {}

  @Post()
  create(@Body() createOrderCategoryDetailDto: CreateOrderCategoryDetailDto) {
    return this.orderCategoryDetailService.create(createOrderCategoryDetailDto);
  }

  @Get()
  findAll() {
    return this.orderCategoryDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderCategoryDetailService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderCategoryDetailDto: UpdateOrderCategoryDetailDto) {
    return this.orderCategoryDetailService.update(+id, updateOrderCategoryDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderCategoryDetailService.remove(+id);
  }
}
