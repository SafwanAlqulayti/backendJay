import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/entities/order.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { OrderStatus } from "src/constants/order-status";
import { HistroyOrderDto } from './dto/history.order.dto';
import { MealEntity } from 'src/entities/meal.entity';
import { MealService } from 'src/meal/meal.service';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class OrderService {
  constructor(
    private _orderRepo: OrderRepository,
    private _authService: AuthService,
    private _restaurantService: RestaurantService,
    private _mealService:MealService,
    private _restaurantBranchService:BranchService
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    let meals = await this._mealService.addMealToOrder(createOrderDto.mealsIds)
    let user = await this._authService.findOne(createOrderDto.userId)
    if (!user) {
      throw new BadRequestException()
    }
    let restaurantBranch = await this._restaurantBranchService.findOne(createOrderDto.restaurantId)
    //let restaurant = await this._restaurantService.findOne({ id: createOrderDto.restaurantId })//check restauran staus befoure order
    let order = new Order();
    order.price = createOrderDto.price;
    order.user = user,
    order.restaurantBranch = restaurantBranch,
    order.status = OrderStatus.OPENED,
    order.meals = meals
    console.log('start///////////////');
    console.log(order)
    return this._orderRepo.save(order)
  }

  async historyOrder(histroyOrderDto: HistroyOrderDto) {
    let orders = await this._orderRepo.find({
      where: { user: histroyOrderDto.userId, status: OrderStatus.COMPLATED }, relations: ['restaurant','meals']
    })
    if (orders.length < 1) {
      return { message: "no order for this user yet" }
    }
    return orders
  }
}

// let orders = await this._orderRepo.createQueryBuilder('order')
// // .leftJoin('order.Restaurant' , 'Restaurant')
//  //.select(['r.image'])
// .leftJoin(RestaurantEntity, 'r', 'r.id = :user',{user:histroyOrderDto.userId})
// //.where('request.id = :id', { id: requestId })
// .where({User:histroyOrderDto.userId})
//  .getMany()
//  // if(orders.length > 0){
//  //   return {message:"no order for this user yet"}
//  // }
//  return orders