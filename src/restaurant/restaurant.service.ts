import { Length } from 'class-validator';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'src/auth/user-role.enum';
import { RestaurantEntity } from 'src/restaurant/restaurant.entity';
import { EntityRepository, FindConditions, In, Like } from 'typeorm';
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
import { firstBy } from 'thenby';
import { InjectRepository } from '@nestjs/typeorm';
import { relative } from 'path';
import { ApiTags } from '@nestjs/swagger';
const arraySort = require('array-sort');

// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
@Injectable()
@EntityRepository(RestaurantEntity)
@ApiTags('Restaurants')
export class RestaurantService {
  @InjectRepository(RestaurantEntity)
  private readonly _restaurantRepository: Repository<RestaurantEntity>;

  constructor(
    private _authService: AuthService,
    private _minioService: MinioClientService,
    private _geoLocationService: GeoLocationService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto, user, file) {
    const restaurant = new RestaurantEntity();
    //let userLogged = await this._authService.findOne(user.id)
    restaurant.kind = createRestaurantDto.kind;
    restaurant.name = createRestaurantDto.name;
    restaurant.rate = createRestaurantDto.rate;
    restaurant.latitude = createRestaurantDto.latitude;
    restaurant.longitude = createRestaurantDto.longitude;
    restaurant.image = '';
    restaurant.userId = user.id;
    await this._restaurantRepository.save(restaurant);
    // let mainCourseImage = await this._minioService.putOpject(
    //   createRestaurantDto.Bucket,
    //   file,
    //   restaurant.id,
    // );TODO: return this and upload two file
    const restaurantImage = await this._minioService.putOpject(
      createRestaurantDto.Bucket,
      file,
      restaurant.id,
    );

    // restaurant.mainCourseImage = mainCourseImage.url;
    restaurant.image = restaurantImage.url;
    //resturant.image = result.url;
    await this._restaurantRepository.save(restaurant);

    return restaurant;
  }

  async addResturantMainImage(
    file,
    addResturantMainImageDto: AddResturantMainImageDto,
  ) {
    const restaurant = await this.findOne({
      id: addResturantMainImageDto.restaurantId,
    });

    const result = await this._minioService.putOpject(
      file,
      addResturantMainImageDto.bucket,
      restaurant.id,
    );
    //restaurant.image = result.url;
    restaurant.mainCourseImage = result.url;
    return this._restaurantRepository.save(restaurant);
  }

  async update(user, updateRestaurantDto: UpdateRestaurantDto) {
    // let restaurant = await this._restaurantRepository.findOne({ userId: user.id, id: updateRestaurantDto.id })
    const userDetail = await this._authService.findOne(user.id);
    //   let userRestaurants = await this._restaurantRepository.find({where:{
    //     userId:userDetail.id
    //   },
    //   relations:['userId']
    // })
    if (!userDetail.userRole.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException(
        'This action only available to admins and restaurants owner',
      );
    }

    const restaurant = await this.findOne({
      id: updateRestaurantDto.id,
    });

    if (restaurant.isDeleted === true)
      throw new BadRequestException('This restaurant is deleted');
    restaurant.name = updateRestaurantDto.name;
    restaurant.kind = updateRestaurantDto.kind;
    await this._restaurantRepository.save(restaurant);

    return restaurant;
  }

  async getRestaurant(findRestauranDto: FindRestauranDto) {
    const restaurant = await this.findOne({
      id: findRestauranDto.restaurantId,
    });
    return restaurant;
  }

  async delete(user, deleteRestaurantDto: DeleteRestaurantDto) {
    const userDetail = await this._authService.findOne(user.id);
    if (userDetail.userRole !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'This action only available to admins and restaurants owner',
      );
    }
    const restaurant = await this._restaurantRepository.findOne({
      where: {
        id: deleteRestaurantDto.id,
        isDeleted: true,
      },
    });
    if (restaurant)
      throw new BadRequestException(
        `Restaurant with the id ${deleteRestaurantDto.id} is already deleted`,
      );
    await this._restaurantRepository
      .createQueryBuilder()
      .update(RestaurantEntity)
      .set({ IsActive: false, isDeleted: true })
      .where({ id: deleteRestaurantDto.id })
      .execute();
    return {
      message: `the restaurant with the id ${deleteRestaurantDto.id} has been deleted`,
    };
  }

  async getOwnerRestaurants(user) {
    const restaurants = await this._restaurantRepository.find({
      where: { userId: user.id },
      relations: ['restaurantFile'],
    });
    if (restaurants.length > 0 && restaurants) return restaurants;

    throw new BadRequestException('There is no restaurants for this user');
  }

  async queryByName(query: string) {
    return this._restaurantRepository
      .createQueryBuilder('restaurant')
      .where('restaurant.name LIKE :name', { name: `%${query}%` })
      .getMany();
  }

  async getAllRestaurant(
    user: UserLatLongDto,
    query: UserLatLongDto,
  ): Promise<RestaurantEntity[]> {
    // return all restaurants to update isClosed based on current time
    console.log(query);
    if (query.name) {
      return this.queryByName(query.name);
    }

    let openedRestaurant: any = await this._restaurantRepository.find({
      isClosed: false,
    });
    // git the distance based in the user current long and lat
    if (query.long && query.lat) {
      openedRestaurant.map(
        async (restaurant: RestaurantEntity & { distance: number }) => {
          restaurant.distance =
            await this._geoLocationService.getDistanceFromLatLonInKm(
              query.lat,
              query.long,
              restaurant.latitude,
              restaurant.longitude,
            );
        },
      );
    }
    // closed restaurants
    const closedRestaurants = await this._restaurantRepository.find({
      where: { isClosed: true },
    });
    //sort restaurant by their distance
    await openedRestaurant.sort(firstBy('distance', { direction: 'asc' }));
    openedRestaurant = await openedRestaurant.concat(closedRestaurants);
    console.log(openedRestaurant);
    if (openedRestaurant.length > 0) {
      return openedRestaurant;
    } else {
      throw new BadRequestException(
        'No restaurants available at the moment kindly check agin later',
      );
    }
  }

  async updateRestaurantStatus() {
    const allRestaurant: any = await this._restaurantRepository
      .createQueryBuilder('restaurant')
      .getMany();

    const hour: number = this.checkOpenedRestaurant();
    const openedRestaurantIds: string[] = [];
    // get restaurants ids which are opend
    allRestaurant.forEach(async (restaurant: RestaurantEntity) => {
      if (restaurant.openHour < hour && restaurant.closeHour > hour) {
        openedRestaurantIds.push(restaurant.id);
      }
    });
    return this._restaurantRepository
      .createQueryBuilder()
      .update(RestaurantEntity)
      .where({ id: In(openedRestaurantIds) })
      .set({
        isClosed: true,
      })
      .execute();
  }

  sortByKey(array, distance) {
    return array.sort(function (a, b) {
      const x = a[distance];
      const y = b[distance];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
  //   return `This action updates a #${id} restaurant`;
  // }

  // findOne(findData: FindConditions<RestaurantEntity>): Promise<RestaurantEntity> {
  //   return this._restaurantRepository.findOne(findData);
  // }

  async findOne(
    findData: FindConditions<RestaurantEntity>,
  ): Promise<RestaurantEntity> {
    const restaurant = await this._restaurantRepository.findOne(findData);
    if (!restaurant) {
      throw new BadRequestException('restauran is not exist');
    }
    return restaurant;
  }

  // async findById(id: UUID): Promise<RestaurantEntity> {
  //   let restaurant = await this._restaurantRepository.findOne(id);
  //   if(restaurant){
  //     return restaurant
  //   }
  //   throw new BadRequestException('Restaurant not found')
  // }

  checkOpenedRestaurant() {
    const d = new Date();
    const local = d.getTime();
    console.log('local', local);
    const offset = d.getTimezoneOffset() * (60 * 1000);
    console.log('offset', offset);
    const utc = new Date(local + offset);
    console.log('utc', utc);
    const riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
    console.log(offset);
    console.log(riyadh.getHours());
    return riyadh.getHours();
  }
}
