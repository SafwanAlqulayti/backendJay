import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/entities/order.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { OrderStatus } from "src/constants/order-status";
import { HistroyOrderDto } from './dto/history.order.dto';

@Injectable()
export class OrderService {
  constructor(
    private _orderRepo:OrderRepository,
    private _authService:AuthService,
    private _estaurantService:RestaurantService
  ){}

 async create(createOrderDto: CreateOrderDto):Promise<Order> {
    let user = await this._authService.findOne(createOrderDto.userId)
    if(!user){
      throw new BadRequestException()
    }
    let restaurant = await this._estaurantService.findOne({id:createOrderDto.restaurantId})
    let order = new Order();
    order.price = createOrderDto.price;
     user
    restaurant
    order.status = OrderStatus.OPENED

    return this._orderRepo.save(order)
  }
  
async historyOrder(histroyOrderDto:HistroyOrderDto){
  let orders = await this._orderRepo.find({
    where:{User:histroyOrderDto.userId ,status:OrderStatus.COMPLATED},relations:['Restaurant'] 
  })
  if(orders.length > 1){
    return {message:"no order for this user yet"}
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