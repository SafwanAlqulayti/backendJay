import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateMealDto } from './dto/createMealDto';
import { MealService } from './meal.service';
import {DeleteMealDto} from './dto/deleteMealDto'
import { GetUser } from 'src/auth/getUser.decorator';
import { UpdateMealDto } from './dto/updateMeal.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetMealByCategory } from './dto/getMealByCategory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindMealDto } from './dto/findMealDto';

@Controller('meal')
 @UseGuards(AuthGuard('jwt'))
export class MealController {
    constructor(
        private _mealService: MealService
    ) { }
        //TODO check all end point and handle error
    @Get('/:mealId')
    getMealById(@Param() findMealDto:FindMealDto){
        return this._mealService.findMeal(findMealDto.mealId)
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(
        @Body() createMealDto: CreateMealDto,
        @UploadedFile() file
        ) {
            if (file === undefined) {
                throw new BadRequestException(['file photo is required'], 'Validation Failed');
            }
        return this._mealService.create(file ,createMealDto)
    }
    //All meals that belongs to category id
    @Get(':categoryId/category')
    getAllMeals(@Param() getMealByCategory:GetMealByCategory ) {
        return this._mealService.getAllMeals(getMealByCategory.categoryId);
    }

    @Delete(':mealId')
    delete(@Param('mealId')deleteMealDto:DeleteMealDto, @GetUser() user ){
        return this._mealService.delete(deleteMealDto.mealId,user)
    }1

    @Put(':mealId')
    update(@Param('mealId') updateMealDto:UpdateMealDto,@GetUser() user){
        return this._mealService.update(updateMealDto,user)
    }

    @Get('meal-image/:mealId')
    findMealImage(@Param() id:FindMealDto){
        return this._mealService.findMealImage(id)
    }


}
