import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMealDto } from './dto/createMealDto';
import { MealService } from './meal.service';
import {DeleteMealDto} from './dto/deleteMealDto'
import { GetUser } from 'src/auth/getUser.decorator';
import { UpdateMealDto } from './dto/updateMeal.dto';

@Controller('meal')
export class MealController {
    constructor(
        private _mealService: MealService
    ) { }

    @Post()
    create(@Body() createMealDto: CreateMealDto) {
        return this._mealService.create(createMealDto)
    }



    //All meals that belongs to category id
    @Get()
    getAllMeals() {
        return this._mealService.getAllMeals();
    }


    @Delete(':MealId')
    delete(@Param('MealId')deleteMealDto:DeleteMealDto, @GetUser() user ){
        return this._mealService.delete(deleteMealDto.MealId,user)
    }


    @Put(':MealId')
    update(@Param('MealId') updateMealDto:UpdateMealDto,@GetUser() user){
        return this._mealService.update(updateMealDto,user)
    }
}
