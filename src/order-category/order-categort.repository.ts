import { OrderCategory } from 'src/entities/order-category.entity';
import { RestaurantEntity } from 'src/restaurant/restaurant.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(OrderCategory)
export class OrderCategoryRepository extends Repository<OrderCategory> {}
