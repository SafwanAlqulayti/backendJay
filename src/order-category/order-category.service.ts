import { Injectable } from '@nestjs/common';
import { OrderCategory } from 'src/entities/order-category.entity';
import { MealService } from 'src/meal/meal.service';
import { EntityRepository } from 'typeorm';
import { CreateOrderCategoryDto } from './dto/create-order-category.dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { OrderCategoryRepository } from './order-categort.repository';

@Injectable()
@EntityRepository(OrderCategory)
export class OrderCategoryService {
  constructor(private MealService:MealService ,private _orderCategoryRepository:OrderCategoryRepository){}
  async create(createOrderCategoryDto: CreateOrderCategoryDto) {
    let meal = await this.MealService.findMeal(8);

    let orderCategory = new OrderCategory()
    orderCategory.name = createOrderCategoryDto.name;
    orderCategory.MealEntity = meal;

    console.log(meal)
    return await this._orderCategoryRepository.save(orderCategory);
    
    
  }

  findAll() {
    return `This action returns all orderCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderCategory`;
  }

  update(id: number, updateOrderCategoryDto: UpdateOrderCategoryDto) {
    return `This action updates a #${id} orderCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderCategory`;
  }
}
