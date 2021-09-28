import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'src/auth/user-role.enum';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
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
import { firstBy } from "thenby";
var arraySort = require('array-sort');


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
    let userLogged = await this._authService.findOne(user.id)
    resturant.kind = createRestaurantDto.kind;
    resturant.name = createRestaurantDto.name;
    resturant.rate = createRestaurantDto.rate;
    resturant.latitude = createRestaurantDto.latitude;
    resturant.longitude = createRestaurantDto.longitude;
    resturant.image = '';
    resturant.userId = user.id
    await this._restaurantRepository.save(resturant);
    console.log('before image')
    let mainCourseImage = await this._minioService.putOpject(createRestaurantDto.Bucket, file, resturant.id)
    let restauranImage = await this._minioService.putOpject(createRestaurantDto.Bucket, file, resturant.id)

    console.log('after image')

    resturant.mainCourseImage = mainCourseImage.url
    resturant.image = restauranImage.url
    //resturant.image = result.url;  
    await this._restaurantRepository.save(resturant);
    console.log('after insert')


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
    restaurant.mainCourseImage = result.url
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

  async queryByName(query) {
    return this._restaurantRepository.createQueryBuilder('restaurant')
      .where('restaurant.name LIKE :name', { name: `%${query.name}%` })
      .getMany()
  }

  async getAllRestaurant(user: UserLatLongDto, query: UserLatLongDto): Promise<RestaurantEntity[]> {
    // return all restaurants to update isClosed based on current time
    if (query.name) {
      return this.queryByName(query.name)
    }

    let openedRestaurant: any = await this._restaurantRepository.find({ isClosed: false })
    // git the distance based in the user current long and lat
    if (query.long && query.lat) {
      openedRestaurant.map(async (restaurant: RestaurantEntity & { distance: number }) => {
        restaurant.distance = await this._geoLocationService.getDistanceFromLatLonInKm(query.lat, query.long, restaurant.latitude, restaurant.longitude)
      })
    }
    // closed restaurants
    let closedRestaurants = await this._restaurantRepository.find({ isClosed: true })
    //sort restaurant by their distance
    await openedRestaurant.sort(firstBy("distance", { direction: "asc" }));
    openedRestaurant = await openedRestaurant.concat(closedRestaurants)
    return openedRestaurant
  }

  async updateRestaurantStatus() {
    let allRestaurant: any = await this._restaurantRepository.createQueryBuilder("restaurant")
      .getMany();

    let hour: number = this.checkOpenedRestaurant()
    let openedRestaurantIds: string[] = []
    // get restaurants ids which are opend
    allRestaurant.forEach(async (restaurant: RestaurantEntity) => {
      if (restaurant.openHour < hour && restaurant.closeHour > hour) {
        openedRestaurantIds.push(restaurant.id)
      }
    })
    return this._restaurantRepository.createQueryBuilder()
      .update(RestaurantEntity)
      .where({ id: In(openedRestaurantIds) })
      .set({
        isClosed: true
      })
      .execute()
  }

  sortByKey(array, distance) {
    return array.sort(function (a, b) {
      var x = a[distance]; var y = b[distance];
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

  checkOpenedRestaurant() {
    var d = new Date();
    var local = d.getTime();
    console.log('local', local)
    var offset = d.getTimezoneOffset() * (60 * 1000);
    console.log('offset', offset)
    var utc = new Date(local + offset);
    console.log('utc', utc)
    var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000)); console.log(offset);
    console.log(riyadh.getHours())
    return riyadh.getHours()

  }
}
