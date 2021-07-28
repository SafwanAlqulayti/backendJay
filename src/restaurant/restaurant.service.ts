import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'src/auth/user-role.enum';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { EntityRepository, FindConditions } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/deleteRestaurantDto';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { RestaurantRepository } from './restaurantRepository';
import { getConnection } from "typeorm";
import { UUID } from 'aws-sdk/clients/inspector';
import { MinioClientService } from 'src/minio/minio.service';
import { GeoLocationService } from 'src/shared/services/location';
import { UserEntity } from 'src/entities/user.entity';
import { UserLatLongDto } from './dto/userLatLongDto';

// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
@EntityRepository(RestaurantEntity)
export class RestaurantService {
  constructor(
    private _restaurantRepository: RestaurantRepository,
    private _authService: AuthService,
    private _minio: MinioClientService,
    private _geoLocationService: GeoLocationService,


  ) { }

  async create(createRestaurantDto: CreateRestaurantDto, user: UserEntity, file) {
    let url = await this._minio.putOpject(createRestaurantDto.Bucket, file)
    console.log(user)
    //let user = await this._authService.findOne()
    let resturant = new RestaurantEntity()
    resturant.kind = 'createRestaurantDto.kind'
    resturant.name = 'createRestaurantDto.name'
    resturant.rate = createRestaurantDto.rate
    resturant.latitude = createRestaurantDto.latitude
    resturant.longitude = createRestaurantDto.longitude
    resturant.image = url;
    resturant.userId = user
    await this._restaurantRepository.save(resturant)
    return resturant
  }

  async update(user, updateRestaurantDto: UpdateRestaurantDto) {
    // let restaurant = await this._restaurantRepository.findOne({ userId: user.id, id: updateRestaurantDto.id })

    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    }
    let restaurant = await this.findById(updateRestaurantDto.id)
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
      .set({ IsActive: true })
      .where({ id: deleteRestaurantDto.id }).execute();
    return true;
  }


  findAll(user) {
    return this._restaurantRepository.find({ where: { userId: user.id }, relations: ["restaurantFile"] });
  }

  async getAllRestaurant(user: UserLatLongDto, query: UserLatLongDto) {
    let restaurnats = await this._restaurantRepository.find();
    // let userLocation = await this._geoLocationService.getDistanceFromLatLonInKm('22', '22' ,'2','2')
    if (query.long && query.lat) {
      restaurnats.map(async (restaurant: RestaurantEntity & { distance: number }) => {
        restaurant.distance = await this._geoLocationService.getDistanceFromLatLonInKm(query.lat, query.long, restaurant.latitude, restaurant.longitude)
       await this.sortByKey(restaurnats, 'distance')

      });
    }
    return restaurnats
  }
  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  // update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
  //   return `This action updates a #${id} restaurant`;
  // }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }

  findOne(findData: FindConditions<RestaurantEntity>): Promise<RestaurantEntity> {
    return this._restaurantRepository.findOne(findData);
  }

  findById(id: UUID): Promise<RestaurantEntity> {
    return this._restaurantRepository.findOne(id);
  }
}
