import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/getUser.decorator';
import { CreateMealDto } from './dto/createMealDto';
import { MealService } from './meal.service';

@Controller('meal')
@UseGuards(AuthGuard('jwt'))
export class MealController {
    constructor(
        private _mealService:MealService
    ){ } 

    @Post()
    addMeal(@Body() createMealDto:CreateMealDto,
    @GetUser() user
    ){
        return this._mealService.addMeal(createMealDto,user)
    }



    //All meals that belongs to category id
    @Get()
    getAllMeals(){

        return this._mealService.getAllMeals();

    }
}
