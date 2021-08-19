import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'src/auth/user-role.enum';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { EntityRepository, FindConditions } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { DeleteRestaurantDto } from './dto/deleteRestaurantDto';
import { UpdateRestaurantDto } from './dto/updateRestaurantDto';
import { RestaurantRepository } from './restaurantRepository';
import { getConnection } from 'typeorm';
import { UUID } from 'aws-sdk/clients/inspector';
import { MinioClientService } from 'src/minio/minio.service';
import { GeoLocationService } from 'src/shared/services/location';
import { UserEntity } from 'src/entities/user.entity';
import { UserLatLongDto } from './dto/userLatLongDto';
import { AddResturantMainImageDto } from './dto/addRestauranMainImage';
import { FindRestauranDto } from './dto/findRestaurantDto';
import { RestaurantBranchEntity } from 'src/entities/restaurantBranch.entity';

// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
@EntityRepository(RestaurantEntity)
export class RestaurantService {
  constructor(
    private _restaurantRepository: RestaurantRepository,
    private _authService: AuthService,
    private _minioService: MinioClientService,
    private _geoLocationService: GeoLocationService
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto, user, file) {
    let resturant = new RestaurantEntity();
    resturant.kind = createRestaurantDto.kind;
    resturant.name = createRestaurantDto.name;
    // resturant.rate = createRestaurantDto.rate;
    // resturant.latitude = createRestaurantDto.latitude;
    // resturant.longitude = createRestaurantDto.longitude;
    // resturant.image = '';
    resturant.userId = user.id;
    await this._restaurantRepository.save(resturant);

    let result = await this._minioService.putOpject(createRestaurantDto.Bucket, file, resturant.id)

    console.log(result);

    //resturant.image = result.url;  
    await this._restaurantRepository.save(resturant);


    return resturant;
  }

  async addResturantMainImage(
    file,
    addResturantMainImageDto: AddResturantMainImageDto,
  ) {
    let restaurant = await this._restaurantRepository.findOne({
      id: addResturantMainImageDto.restaurantId,
    });
    console.log(restaurant);
    let result = await this._minioService.putOpject(
      file,
      addResturantMainImageDto.bucket,
      restaurant.id,
    );
    //restaurant.image = result.url;
    return this._restaurantRepository.save(restaurant);
  }

  async update(user, updateRestaurantDto: UpdateRestaurantDto) {
    // let restaurant = await this._restaurantRepository.findOne({ userId: user.id, id: updateRestaurantDto.id })

    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException();
    }
    let restaurant = await this.findById(updateRestaurantDto.id);
    restaurant.name = updateRestaurantDto.name;
    restaurant.kind = updateRestaurantDto.kind;
    await this._restaurantRepository.save(restaurant);

    return restaurant;
  }

  async getRestaurant(findRestauranDto: FindRestauranDto) {
    let restaurant = await this._restaurantRepository.findOne({
      id: findRestauranDto.restaurantId,
    });
    return restaurant;
  }

  async delete(user, deleteRestaurantDto: DeleteRestaurantDto) {
    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException();
    }

    const queryBuilder = await this._restaurantRepository
      .createQueryBuilder()
      .update(RestaurantEntity)
      .set({ IsActive: true })
      .where({ id: deleteRestaurantDto.id })
      .execute();
    return true;
  }

  findAll(user) {
    return this._restaurantRepository.find({
      where: { userId: user.id },
      relations: ['restaurantFile'],
    });
  }

  async getAllRestaurant(user: UserLatLongDto, query: UserLatLongDto) {
    let restaurnats = await this._restaurantRepository.createQueryBuilder("restaurant")
      .innerJoinAndSelect("restaurant.restaurantBranches", "RestaurantBranchEntity")
      .getMany();

    if (query.long && query.lat) {
      restaurnats.map(async (restaurant: RestaurantEntity & { restaurantBranches?: any[] }) => {
        restaurant.restaurantBranches.map(async (restaurantBranch: RestaurantBranchEntity & { distance: number }) => {
          restaurantBranch.distance = await this._geoLocationService.getDistanceFromLatLonInKm(query.lat, query.long, restaurantBranch.latitude, restaurantBranch.longitude)
        })
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
  async findOne1(
    findData: FindConditions<RestaurantEntity>,
  ): Promise<RestaurantEntity> {
    let restaurant = await this._restaurantRepository.findOne(findData);
    if (!restaurant) {
      throw new BadRequestException('restauran is not exist');
    }
    return restaurant;
  }

  findById(id: UUID): Promise<RestaurantEntity> {
    return this._restaurantRepository.findOne(id);
  }
}
