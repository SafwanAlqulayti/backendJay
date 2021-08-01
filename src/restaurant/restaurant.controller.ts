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

//  @UseGuards(AuthGuard())// we can use  it in one handler , now we cant access unless we have token
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() file,
    @GetUser() user,
  ) {
    return this.restaurantService.create(createRestaurantDto, user, file);
  }

  @Post('upload-main-image')
  @UseInterceptors(FileInterceptor('file'))
  uploudFile(@UploadedFile() file, @Body() data: AddResturantMainImageDto) {
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
  @Get('all-restaurant')
  getAllRestaurant(
    @GetUser() user,
    @Query() query: UserLatLongDto,
  ) {
    return this.restaurantService.getAllRestaurant(user, query);
  }

  @Put()
  updateRestaurant(
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @GetUser() user,
  ) {
    return this.restaurantService.update(user, updateRestaurantDto);
  }

  @Delete(':id')
  deleteRestaurant(
    @Param() deleteRestaurantDto: DeleteRestaurantDto,
    @GetUser() user,
  ) {
    console.log(deleteRestaurantDto);
    return this.restaurantService.delete(user, deleteRestaurantDto);
  }

  // @Get('main-image/:restaurantId')
  // getRestaurant(@Param() id: FindRestauranDto) {
  //   return this.restaurantService.getRestauranMainImage(id);
  // }

  @Get('user')
  findAll(@GetUser() user) {
    return this.restaurantService.findAll(user);
  }

  @Get(':restaurantId')
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
