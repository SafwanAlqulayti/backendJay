import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'aws-sdk/clients/inspector';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { UserRole } from 'src/auth/user-role.enum';
import { CategoryService } from 'src/category/category.service';
import { MealEntity } from 'src/entities/meal.entity';
import { CreateMealDto } from './dto/createMealDto';
import { UpdateMealDto } from './dto/updateMeal.dto';
import { MealRepository } from './mealRepository';
import { MinioClientService } from 'src/minio/minio.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { FindConditions } from 'typeorm';
import { FindMealDto } from './dto/findMealDto';

@Injectable()
export class MealService {
    constructor(
        private _mealRepositroy: MealRepository,
        private _categoryService: CategoryService,
        private _minioService: MinioClientService,
        private _restaurantService: RestaurantService


    ) { }
    async create(file,createMealDto: CreateMealDto) {
        const category = await this._categoryService.findOne(createMealDto.categoryId)
        let resturant = await this._restaurantService.findOne({id:createMealDto.restaurantId})
        let result = await this._minioService.putOpject(file ,resturant.name,createMealDto.restaurantId + createMealDto.name )
        if(result.success === false){
            throw new BadRequestException('Image did not uploaded')
        }
        console.log(result)
        let meal = new MealEntity()
        meal.name = createMealDto.name
        meal.price = createMealDto.price
        meal.isAvilable = createMealDto.isAvilable
        meal.image = result.url
        meal.CategoryId = category
        // meal.restaurantId = resturant
        await this._mealRepositroy.save(meal)
        return meal
    }

    //All meals that belongs to category id
    async getAllMeals(id:UUID) {
        const z = await this._mealRepositroy.find({ where: { CategoryId: id }, relations: ["CategoryId"] })
        return z
    }

    async findMeal(id) {
        return await this._mealRepositroy.findOne(id);
    }
    async findMealImage(findMealDto:FindMealDto) {
        let meal = await this.findOne({id:findMealDto.mealId})
        return meal.image
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
    async findOne(findData: FindConditions<MealEntity>): Promise<MealEntity> {
        let meal = await this._mealRepositroy.findOne(findData);
        if(!meal){
          throw new BadRequestException('restauran is not exist')
        }
        return meal
      }
}
