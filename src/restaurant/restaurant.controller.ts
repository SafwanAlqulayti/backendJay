import { AllRestaurantsDto } from './dto/all-restaurants.dto';
import { RestaurantEntity } from 'src/restaurant/restaurant.entity';
import {
  BadRequestException, Body, Controller,
  Delete, Get,
  Param, Post,
  Put, Query, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/getUser.decorator';
import { AddResturantMainImageDto } from './dto/addRestauranMainImage';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/deleteRestaurantDto';
import { FindRestauranDto } from './dto/findRestaurantDto';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { UserLatLongDto } from './dto/userLatLongDto';
import { RestaurantService } from './restaurant.service';
// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
@ApiTags('Restaurants')
//@UseGuards(AuthGuard()) // we can use  it in one handler , now we cant access unless we have token
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  //checked
  @ApiResponse({type:RestaurantEntity})
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() file,
    @GetUser() user,
  ) {
    if (file === undefined) {
      throw new BadRequestException(
        ['file photo is required'],
        'Validation Failed',
      );
    }
    return this.restaurantService.create(createRestaurantDto, user, file);
  }

  @Post('upload-main-image')
  @ApiResponse({type:RestaurantEntity})
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Body() data: AddResturantMainImageDto) {
    return this.restaurantService.addResturantMainImage(file, data);
  }

  // @Post('sava-image')
  // @UseInterceptors(
  //   FileInterceptor("file"),
  //   )
  // saveImage(@UploadedFile()file){
  //   (file);
  // }
  // update(@Param('id') id: string, @Body()

  @Get() //FE update the end point from restaurant/all-restaurant to get restaurant
  //checked
  @ApiResponse({type:[AllRestaurantsDto]})
  getAllRestaurant(@GetUser() user, @Query() query: UserLatLongDto) {
    return this.restaurantService.getAllRestaurant(user, query);
  }

  @Put()
  //checked
  @ApiResponse({type:RestaurantEntity})
  updateRestaurant(
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @GetUser() user,
  ) {
    return this.restaurantService.update(user, updateRestaurantDto);
  }

  @ApiResponse({
    schema:{
      type:'object',
      properties:{
          message: {
            type:'string',
            example:`the restaurant with the id 8792302382983283 has been deleted`,
          }
      }
    }
  })
  @Delete(':id') //checked
  deleteRestaurant(
    @Param() deleteRestaurantDto: DeleteRestaurantDto,
    @GetUser() user,
  ) {
    return this.restaurantService.delete(user, deleteRestaurantDto);
  }

  // @Get('main-image/:restaurantId')
  // getRestaurant(@Param() id: FindRestauranDto) {
  //   return this.restaurantService.getRestauranMainImage(id);
  // }

  @Get('owner')
  @ApiResponse({type:[AllRestaurantsDto]})
  //checked
  getOwnerRestaurants(@GetUser() user) {
    return this.restaurantService.getOwnerRestaurants(user);
  }

  @Get(':restaurantId')
  @ApiResponse({type:RestaurantEntity})
  //checked
  findResturant(@Param() findRestauranDto: FindRestauranDto) {
    console.log(findRestauranDto)
    return this.restaurantService.getRestaurant(findRestauranDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.restaurantService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
  //   return this.restaurantService.update(+id, updateRestaurantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.restaurantService.remove(+id);
  // }
}
