import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { EntityRepository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/deleteRestaurantDto';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { RestaurantRepository } from './restaurantRepository';
// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
@EntityRepository(RestaurantEntity)
export class RestaurantService {
  constructor(
    private _restaurantRepository: RestaurantRepository,
    private _authService: AuthService
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto, user) {
    console.log(user)
    // let user = await this._authService.findOne(5)
    let resturant = new RestaurantEntity()
    resturant.kind = createRestaurantDto.kind
    resturant.name = createRestaurantDto.name
    resturant.userId = user.id
    await this._restaurantRepository.save(resturant)
    return resturant
  }

  async update(user, updateRestaurantDto: UpdateRestaurantDto) {
    let restaurant = await this._restaurantRepository.findOne({ userId: user.id, id: updateRestaurantDto.id })
    restaurant.name = updateRestaurantDto.name
    restaurant.kind = updateRestaurantDto.kind
    await this._restaurantRepository.save(restaurant)

    return restaurant
  }


  async getRestaurant(id) {
    let restaurant = await this._restaurantRepository.findOne(id)
    return restaurant;
  }

  async delete(user, deleteRestaurantDto: DeleteRestaurantDto) {
    this._restaurantRepository.delete({ id: deleteRestaurantDto.id, userId: user.id })
    return `Restaurant with ${deleteRestaurantDto.id} has been deleted`
  }


  findAll(user) {
    return this._restaurantRepository.find({ where: { userId: user.id }, relations: ["restaurantFile"] });
  }

  getAllRestaurant() {
    return this._restaurantRepository.find();

  }

  findOne(id) {
    return this._restaurantRepository.findOne({ id: id })
  }

  // update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
  //   return `This action updates a #${id} restaurant`;
  // }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
