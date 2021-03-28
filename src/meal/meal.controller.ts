import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMealDto } from './dto/createMealDto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
    constructor(
        private _mealService:MealService
    ){ } 

    @Post()
    addMeal(@Body() createMealDto:CreateMealDto){
        return this._mealService.addMeal(createMealDto)
    }



    //All meals that belongs to category id
    @Get()
    getAllMeals(){

        return this._mealService.getAllMeals();

    }
}
