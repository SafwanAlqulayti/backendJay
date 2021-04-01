import { Injectable } from '@nestjs/common';
import { OrderCategoryDetail } from 'src/entities/order-category-detail.entity';
import { OrderCategoryDetailRepository } from './order-category-detail.repository';
import { OrderCategoryService } from 'src/order-category/order-category.service';
import { EntityRepository } from 'typeorm';
import { CreateOrderCategoryDetailDto } from './dto/create-order-category-detail.dto';
import { UpdateOrderCategoryDetailDto } from './dto/update-order-category-detail.dto';

@Injectable()
@EntityRepository(OrderCategoryDetail)
export class OrderCategoryDetailService {

  constructor(private _orderCategoryRepository: OrderCategoryDetailRepository, private _orderCategoryService: OrderCategoryService) { }
  async create(createOrderCategoryDetailDto: CreateOrderCategoryDetailDto) {

    let category = await this._orderCategoryService.findById(1);

    let categoryDetail = new OrderCategoryDetail();
    categoryDetail.name = createOrderCategoryDetailDto.name;
    categoryDetail.price = createOrderCategoryDetailDto.price;
    categoryDetail.OrderCategory = category;

    await this._orderCategoryRepository.save(categoryDetail);
    return categoryDetail


  }

  //Find all order-category-detil That belongs to orderCategory id
  async findAll(id) {
    let orderCategory = await this._orderCategoryService.findById(1);
    return this._orderCategoryRepository.find({ where: { OrderCategory: orderCategory.id }, relations: ["OrderCategory"] })
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
