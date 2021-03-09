import { Injectable } from '@nestjs/common';
import { MealEntity } from 'src/entities/meal.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateMealDto } from './dto/createMealDto';
import { MealRepository } from './mealRepository';

@Injectable()
export class MealService {
constructor(
    private _mealRepositroy:MealRepository,
    private _restaurantService: RestaurantService,

){}
   async addMeal(createMealDto:CreateMealDto){
       let resturant = await this._restaurantService.findOne({id:"11"})
        let meal = new MealEntity()
        meal.name = createMealDto.name
        meal.price = createMealDto.price
        meal.category = createMealDto.category
        meal.isAvilable = createMealDto.isAvilable
        meal.restaurantId = resturant
        await this._mealRepositroy.save(meal)
        return meal
    }
}
