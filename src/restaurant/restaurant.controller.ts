import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { GetUser } from 'src/auth/getUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { DeleteRestaurantDto } from './dto/deleteRestaurantDto';
// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
@UseGuards(AuthGuard())// we can use it in one handler , now we cant access unless we have token

export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()

  create(@Body() createRestaurantDto: CreateRestaurantDto,
    @GetUser() user
  ) {
    return this.restaurantService.create(createRestaurantDto, user);
  }

  @Get()
  findAll(@GetUser() user
  ) {
    return this.restaurantService.findAll(user);
  }

  @Put()
  updateRestaurant(@Body() updateRestaurantDto: UpdateRestaurantDto,
    @GetUser() user
  ) {
    return this.restaurantService.update(user, updateRestaurantDto)
  }

  @Delete()
  deleteRestaurant(@Body() deleteRestaurantDto: DeleteRestaurantDto,
    @GetUser() user
  ) {
    return this.restaurantService.delete(user, deleteRestaurantDto)
  }




  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.restaurantService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
  //   return this.restaurantService.update(+id, updateRestaurantDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
