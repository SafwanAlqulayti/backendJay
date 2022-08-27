import { OrderCategoryDetail } from 'src/entities/order-category-detail.entity';
import { OrderCategory } from 'src/entities/order-category.entity';
import { RestaurantEntity } from 'src/restaurant/restaurant.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(OrderCategoryDetail)
export class OrderCategoryDetailRepository extends Repository<OrderCategoryDetail> {}
