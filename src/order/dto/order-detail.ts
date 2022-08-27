import { Order } from 'src/entities/order.entity';
import { RestaurantEntity } from 'src/restaurant/restaurant.entity';

export class OrderDetail {
  order: Order;

  restaurant: RestaurantEntity;
}
