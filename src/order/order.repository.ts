import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity'
@EntityRepository(Order)
export class  OrderRepository extends Repository<Order> {}
