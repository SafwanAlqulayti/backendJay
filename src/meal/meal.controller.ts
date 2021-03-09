import { Body, Controller, Post } from '@nestjs/common';
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
}
