import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderCategoryDetailService } from './order-category-detail.service';
import { CreateOrderCategoryDetailDto } from './dto/create-order-category-detail.dto';
import { UpdateOrderCategoryDetailDto } from './dto/update-order-category-detail.dto';
import { DeleteOrderCategoryDetailDto } from './dto/delete-order-category-detail.dto';
import { GetUser } from 'src/auth/getUser.decorator';
import { GetByIdOrderCategoryDto } from './dto/get-by-id.dto';

@Controller('order-category-detail')
export class OrderCategoryDetailController {
  constructor(
    private readonly orderCategoryDetailService: OrderCategoryDetailService,
  ) {}

  @Post()
  create(@Body() createOrderCategoryDetailDto: CreateOrderCategoryDetailDto) {
    return this.orderCategoryDetailService.create(createOrderCategoryDetailDto);
  }

  @Get(':orderCategoryId')
  findAll(@Param() getByIdOrderCategoryDto: GetByIdOrderCategoryDto) {
    return this.orderCategoryDetailService.findAll(
      getByIdOrderCategoryDto.orderCategoryId,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderCategoryDetailService.findOne(+id);
  // }

  @Put()
  update(
    @Body() updateOrderCategoryDetailDto: UpdateOrderCategoryDetailDto,
    @GetUser() user,
  ) {
    return this.orderCategoryDetailService.update(
      updateOrderCategoryDetailDto,
      user,
    );
  }

  @Delete(':orderCategoryDetailId')
  remove(
    @Param('orderCategoryDetailId')
    deleteOrderCategoryDetailDto: DeleteOrderCategoryDetailDto,
    @GetUser() user,
  ) {
    return this.orderCategoryDetailService.delete(
      deleteOrderCategoryDetailDto.orderCategoryDetailId,
      user,
    );
  }
}
