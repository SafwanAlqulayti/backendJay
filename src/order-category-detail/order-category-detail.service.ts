import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrderCategoryDetail } from 'src/entities/order-category-detail.entity';
import { OrderCategoryDetailRepository } from './order-category-detail.repository';
import { OrderCategoryService } from 'src/order-category/order-category.service';
import { EntityRepository } from 'typeorm';
import { CreateOrderCategoryDetailDto } from './dto/create-order-category-detail.dto';
import { UpdateOrderCategoryDetailDto } from './dto/update-order-category-detail.dto';
import { UUID } from 'aws-sdk/clients/inspector';
import { UserRole } from 'src/auth/user-role.enum';

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
  async findAll(id:UUID) {
    let orderCategory = await this._orderCategoryService.findById(id);
    return this._orderCategoryRepository.find({ where: { OrderCategory: orderCategory.id }, relations: ["OrderCategory"] })
  }

  findOneByID(id: UUID) {
    return this._orderCategoryRepository.findOne(id);
  }

 async update(updateOrderCategoryDetailDto: UpdateOrderCategoryDetailDto ,user) {

    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    }
    let orderCategoryDetail = await this.findOneByID(updateOrderCategoryDetailDto.orderCategoryDetailId)
    orderCategoryDetail.name = updateOrderCategoryDetailDto.name
    orderCategoryDetail.price = updateOrderCategoryDetailDto.price
    await this._orderCategoryRepository.save(orderCategoryDetail)
    return orderCategoryDetail



  }

  async delete(id:UUID ,user) {

    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    }


    const queryBuilder = await this._orderCategoryRepository.createQueryBuilder()
      .update(OrderCategoryDetail)
      .set({ IsDeleted: true })
      .where({ id: id }).execute();
    return true;
  } ///
  
}
