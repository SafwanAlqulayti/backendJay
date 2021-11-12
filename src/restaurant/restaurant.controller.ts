import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { GetUser } from 'src/auth/getUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { DeleteRestaurantDto } from './dto/deleteRestaurantDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserLatLongDto } from './dto/userLatLongDto';
import { Query } from '@nestjs/common';
import { AddResturantMainImageDto } from './dto/addRestauranMainImage';
import { FindRestauranDto } from './dto/findRestaurantDto';
// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
@UseGuards(AuthGuard())// we can use  it in one handler , now we cant access unless we have token
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  //checked
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() file,
    @GetUser() user,
  ) {
    if (file === undefined) {
      throw new BadRequestException(['file photo is required'], 'Validation Failed');
  }
    return this.restaurantService.create(createRestaurantDto, user, file);
  }

  @Post('upload-main-image')
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

  @Get()//FE update the end point from restaurant/all-restaurant to get restaurant
  //checked
  getAllRestaurant(
    @GetUser() user,
    @Query() query: UserLatLongDto,
  ) {
    return this.restaurantService.getAllRestaurant(user, query);
  }

  @Put()
  //checked
  updateRestaurant(
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @GetUser() user,
  ) {
    return this.restaurantService.update(user, updateRestaurantDto);
  }

  @Delete(':id')//checked
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
  //checked
  getOwnerRestaurants(@GetUser() user) {
    return this.restaurantService.getOwnerRestaurants(user);
  }

  @Get(':restaurantId')
    //checked
  findResturant(@Param() findRestauranDto: FindRestauranDto) {
    return this.restaurantService.getRestaurant(findRestauranDto)
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
