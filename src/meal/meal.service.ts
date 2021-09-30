import { Repository } from 'typeorm';
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
import { CategoryEntity } from 'src/entities/category.entity';
import { BranchService } from 'src/branch/branch.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MealService {
    @InjectRepository(MealEntity)
    private readonly _mealRepositroy: Repository<MealEntity>
    constructor(
        private _categoryService: CategoryService,
        private _minioService: MinioClientService,
        private _restaurantBranchService: BranchService


    ) { }
    async create(file,createMealDto: CreateMealDto) {
        const category = await this._categoryService.findOne(createMealDto.categoryId)
        const categoryWithResturant = await this._categoryService.findWithRelation(createMealDto.categoryId)



        //let resturant = await this._restaurantBranchService.findOne({id:categoryWithResturant[0].Restaurant.id})

        let randomId = (Math.floor(1000 + Math.random() * 9000)).toString()

        let result = await this._minioService.putOpject(createMealDto.Bucket,file ,randomId)
        if(result.success === false){
            throw new BadRequestException('Image did not uploaded')
        }
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
        console.log('Start /////////////////////');
        const z = await this._mealRepositroy.find({ where: { CategoryId: id }, relations: ["CategoryId"] })
        return z
    }

    async findMeal(mealId) {
        return this._mealRepositroy.createQueryBuilder('meal')
        .select(['meal.id','meal.image','meal.price','RestaurantEntity.id','RestaurantEntity.name','RestaurantEntity.rate','CategoryEntity.id'])
        .leftJoin('meal.CategoryId', 'CategoryEntity')
        .leftJoin('CategoryEntity.RestaurantEntity', 'RestaurantEntity')

        .where({id:mealId})
        .getOne()
       // return  this._mealRepositroy.findOne({id:mealId});
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
            .set({ IsActive: true })
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
      async addMealToOrder(meals:[string]): Promise<MealEntity[]> {
        let mealsIds = await this._mealRepositroy.createQueryBuilder('meal')
        .where("id IN (:...list)",{list:meals})
        .getMany()
        if(mealsIds.length > 0){
            return mealsIds
        }
        throw new BadRequestException('You need to have at least one meal')
    }
}
