import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'src/auth/user-role.enum';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { EntityRepository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/deleteRestaurantDto';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { RestaurantRepository } from './restaurantRepository';
import { getConnection } from "typeorm";

// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
@EntityRepository(RestaurantEntity)
export class RestaurantService {
  constructor(
    private _restaurantRepository: RestaurantRepository,
    private _authService: AuthService
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto, user) {
    // let user = await this._authService.findOne(5)
    let resturant = new RestaurantEntity()
    resturant.kind = createRestaurantDto.kind
    resturant.name = createRestaurantDto.name
    resturant.rate = createRestaurantDto.rate
    resturant.latitude = createRestaurantDto.latitude
    resturant.longitude = createRestaurantDto.longitude
    resturant.image = createRestaurantDto.image;
    resturant.userId = user.id
    await this._restaurantRepository.save(resturant)
    return resturant
  }

  async update(user, updateRestaurantDto: UpdateRestaurantDto) {
    // let restaurant = await this._restaurantRepository.findOne({ userId: user.id, id: updateRestaurantDto.id })

    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    } 
    let restaurant = await this.findOne(updateRestaurantDto.id)
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


    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    }


    const queryBuilder = await this._restaurantRepository.createQueryBuilder()
      .update(RestaurantEntity)
      .set({ IsDeleted: true })
      .where({ id: deleteRestaurantDto.id }).execute();
    return true;
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
