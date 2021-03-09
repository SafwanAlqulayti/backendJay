import { Injectable } from '@nestjs/common';
import { CreateRestaurantCashireDto } from './dto/create-restaurant-cashire.dto';
import { UpdateRestaurantCashireDto } from './dto/update-restaurant-cashire.dto';

@Injectable()
export class RestaurantCashireService {
  create(createRestaurantCashireDto: CreateRestaurantCashireDto) {
    return 'This action adds a new restaurantCashire';
  }

  findAll() {
    return `This action returns all restaurantCashire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantCashire`;
  }

  update(id: number, updateRestaurantCashireDto: UpdateRestaurantCashireDto) {
    return `This action updates a #${id} restaurantCashire`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurantCashire`;
  }
}
