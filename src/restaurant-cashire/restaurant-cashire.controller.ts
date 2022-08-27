import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantCashireService } from './restaurant-cashire.service';
import { CreateRestaurantCashireDto } from './dto/create-restaurant-cashire.dto';
import { UpdateRestaurantCashireDto } from './dto/update-restaurant-cashire.dto';

@ApiTags('Restaurant cashier')
@Controller('restaurant-cashire')
export class RestaurantCashireController {
  constructor(
    private readonly restaurantCashireService: RestaurantCashireService,
  ) {}

  @Post()
  create(@Body() createRestaurantCashireDto: CreateRestaurantCashireDto) {
    return this.restaurantCashireService.create(createRestaurantCashireDto);
  }

  @Get()
  findAll() {
    return this.restaurantCashireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantCashireService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantCashireDto: UpdateRestaurantCashireDto,
  ) {
    return this.restaurantCashireService.update(
      +id,
      updateRestaurantCashireDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantCashireService.remove(+id);
  }
}
