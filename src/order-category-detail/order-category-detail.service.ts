import { Injectable } from '@nestjs/common';
import { OrderCategoryDetail } from 'src/entities/order-category-detail.entity';
import { OrderCategoryRepository } from './order-category-detail.repository';
import { OrderCategoryService } from 'src/order-category/order-category.service';
import { EntityRepository } from 'typeorm';
import { CreateOrderCategoryDetailDto } from './dto/create-order-category-detail.dto';
import { UpdateOrderCategoryDetailDto } from './dto/update-order-category-detail.dto';

@Injectable()
@EntityRepository(OrderCategoryDetail)
export class OrderCategoryDetailService {

  constructor(private _orderCategoryRepository:OrderCategoryRepository,private _orderCategoryService:OrderCategoryService){}
 async create(createOrderCategoryDetailDto: CreateOrderCategoryDetailDto) {

    let category = await this._orderCategoryService.findById(1);

    let categoryDetail= new OrderCategoryDetail();
    categoryDetail.name = createOrderCategoryDetailDto.name;
    categoryDetail.price = createOrderCategoryDetailDto.price;

    categoryDetail.OrderCategory = category;

    console.log(categoryDetail)

    await this._orderCategoryRepository.save(categoryDetail);
    return categoryDetail



  }

  findAll() {
    return `This action returns all orderCategoryDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderCategoryDetail`;
  }

  update(id: number, updateOrderCategoryDetailDto: UpdateOrderCategoryDetailDto) {
    return `This action updates a #${id} orderCategoryDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderCategoryDetail`;
  }
}
