import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateMealDto } from './dto/createMealDto';
import { MealService } from './meal.service';
import {DeleteMealDto} from './dto/deleteMealDto'
import { GetUser } from 'src/auth/getUser.decorator';
import { UpdateMealDto } from './dto/updateMeal.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetMealByCategory } from './dto/getMealByCategory.dto';

@Controller('meal')
// @UseGuards(AuthGuard('jwt'))
export class MealController {
    constructor(
        private _mealService: MealService
    ) { }

    @Post()
    create(@Body() createMealDto: CreateMealDto) {
        return this._mealService.create(createMealDto)
    }



    //All meals that belongs to category id
    @Get(':categoryId')
    getAllMeals(@Param() getMealByCategory:GetMealByCategory ) {
        return this._mealService.getAllMeals(getMealByCategory.categoryId);
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
