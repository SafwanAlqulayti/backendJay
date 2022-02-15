import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'aws-sdk/clients/inspector';
import { UserRole } from 'src/auth/user-role.enum';
import { DeleteCategoryDto } from 'src/category/dto/deleteCategory.dto';
import { OrderCategory } from 'src/entities/order-category.entity';
import { MealService } from 'src/meal/meal.service';
import { EntityRepository } from 'typeorm';
import { CreateOrderCategoryDto } from './dto/create-order-category.dto';
import { DeleteOrderCategoryDto } from './dto/delete-order-category.dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { OrderCategoryRepository } from './order-categort.repository';

@Injectable()
@EntityRepository(OrderCategory)
export class OrderCategoryService {
  @InjectRepository(OrderCategory)
  private readonly _orderCategoryRepository: Repository<OrderCategory>;
  constructor(private MealService: MealService) {}
  async create(createOrderCategoryDto: CreateOrderCategoryDto) {
    const meal = await this.MealService.findMeal(createOrderCategoryDto.mealId);
    const orderCategory = new OrderCategory();
    orderCategory.name = createOrderCategoryDto.name;
    orderCategory.order = createOrderCategoryDto.order;
    orderCategory.MealEntity = meal;
    return await this._orderCategoryRepository.save(orderCategory);
  }

  // findAll(id:UUID) {

  //   console.log(id)

  //   return;
  // }

  async findOne(id: UUID, checkBox: boolean) {
    const meal = await this.MealService.findMeal(id);

    if (checkBox) {
      return this._orderCategoryRepository.find({
        where: { MealEntity: meal.id, isCheckBox: true },
        relations: ['MealEntity'],
      });
    } else {
      return this._orderCategoryRepository.find({
        where: { MealEntity: meal.id, isCheckBox: false },
        relations: ['MealEntity'],
      });
    }
  }

  async findById(id: any) {
    return await this._orderCategoryRepository.findOne(id);
  }

  async update(updateOrderCategoryDto: UpdateOrderCategoryDto, user) {
    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException();
    }
    const orderCategory = await this.findById(
      updateOrderCategoryDto.orderCategoryId,
    );
    orderCategory.name = updateOrderCategoryDto.name;
    orderCategory.order = updateOrderCategoryDto.order;
    await this._orderCategoryRepository.save(orderCategory);
    return orderCategory;
  }

  async delete(id: DeleteOrderCategoryDto, user) {
    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException();
    }

    const queryBuilder = await this._orderCategoryRepository
      .createQueryBuilder()
      .update(OrderCategory)
      .set({ IsActive: true })
      .where({ id: id })
      .execute();
    return true;
  }
}
