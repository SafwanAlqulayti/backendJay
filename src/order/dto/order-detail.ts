import { Order } from 'src/entities/order.entity';
import { RestaurantEntity } from 'src/entities/restaurant.entity';

export class OrderDetail {
  order: Order;

  restaurant: RestaurantEntity;
}
