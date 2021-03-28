import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { MealEntity } from 'src/entities/meal.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateMealDto } from './dto/createMealDto';
import { MealRepository } from './mealRepository';

@Injectable()
export class MealService {
constructor(
    private _mealRepositroy:MealRepository,
    private _categoryService:CategoryService,

){}
   async addMeal(createMealDto:CreateMealDto){
        const category = await this._categoryService.findOne(1)
        console.log(category)
        let meal = new MealEntity()
        meal.name = createMealDto.name
        meal.price = createMealDto.price
        meal.isAvilable = true
        meal.CategoryId= category
        // meal.restaurantId = resturant
        await this._mealRepositroy.save(meal)
        return meal
    }

        //All meals that belongs to category id
    async getAllMeals(){
        const z= await this._mealRepositroy.find({where :{CategoryId:1}, relations:["CategoryId"]})
         return z
    }

    async findMeal(id){
        return await this._mealRepositroy.findOne(id);
    }
}
` `