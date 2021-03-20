import { Injectable } from '@nestjs/common';
import { RestaurantCashire } from 'src/entities/restaurant-cashire.entity';
import { CreateRestaurantCashireDto } from './dto/create-restaurant-cashire.dto';
import { UpdateRestaurantCashireDto } from './dto/update-restaurant-cashire.dto';

@Injectable()
export class RestaurantCashireService {
  create(createRestaurantCashireDto: CreateRestaurantCashireDto) {

    const {user_name,password}=createRestaurantCashireDto;

    let cashire=new RestaurantCashire();
    cashire.user_name=user_name;
    cashire.password=password;


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
