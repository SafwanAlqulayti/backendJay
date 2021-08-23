import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HistroyOrderDto } from './dto/history.order.dto';
import { OrderDetailDto } from './dto/orderDto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get(':userId')
  findOne(@Param() id: HistroyOrderDto) {
    return this.orderService.historyOrder(id);
  }

  @Get('detail/:orderId')
  getOrderDetail(@Param() orderDetailDto:OrderDetailDto){
    return this.orderService.orderDetail(orderDetailDto)
  }  
}
