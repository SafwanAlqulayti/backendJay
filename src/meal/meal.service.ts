import { Injectable } from '@nestjs/common';
import { UUID } from 'aws-sdk/clients/inspector';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { UserRole } from 'src/auth/user-role.enum';
import { CategoryService } from 'src/category/category.service';
import { MealEntity } from 'src/entities/meal.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateMealDto } from './dto/createMealDto';
import { UpdateMealDto } from './dto/updateMeal.dto';
import { MealRepository } from './mealRepository';

@Injectable()
export class MealService {
    constructor(
        private _mealRepositroy: MealRepository,
        private _categoryService: CategoryService,

    ) { }
    async create(createMealDto: CreateMealDto) {
        const category = await this._categoryService.findOne(createMealDto.categoryId)
        let meal = new MealEntity()
        meal.name = createMealDto.name
        meal.price = createMealDto.price
        meal.isAvilable = createMealDto.isAvilable
        meal.image = createMealDto.image
        meal.CategoryId = category
        // meal.restaurantId = resturant
        await this._mealRepositroy.save(meal)
        return meal
    }

    //All meals that belongs to category id
    async getAllMeals() {
        const z = await this._mealRepositroy.find({ where: { CategoryId: 1 }, relations: ["CategoryId"] })
        return z
    }

    async findMeal(id) {
        return await this._mealRepositroy.findOne(id);
    }


    async delete(id: UUID, user) {


        if (!user.user_role.includes(UserRole.ADMIN)) {
            throw new UnauthorizedException()
        }


        const queryBuilder = await this._mealRepositroy.createQueryBuilder()
            .update(MealEntity)
            .set({ IsDeleted: true })
            .where({ id: id }).execute();
        return true;


    }
    async update(updateMealDto: UpdateMealDto, user) {

        if (!user.user_role.includes(UserRole.ADMIN)) {
            throw new UnauthorizedException()
        }
        let meal = await this.findMeal(updateMealDto.MealId)
        meal.name = updateMealDto.name
        meal.price = updateMealDto.price
        meal.image = updateMealDto.image
        meal.isAvilable = updateMealDto.isAvilable
        await this._mealRepositroy.save(meal)

        return meal

    }
}
` `