import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Order } from './order.entity';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { RestaurantFileEntity } from './restaurantFile.entity';

@Entity()
export class RestaurantBranchEntity extends AbstractEntity {
  @Column()
  branchName: string;

  @Column({ nullable: false })
  kind: string;

  @Column({ nullable: true })
  rate: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(
    () => RestaurantFileEntity,
    (restaurantFile: RestaurantFileEntity) => restaurantFile.id,
  )
  restaurantFile: RestaurantFileEntity;

  @ManyToOne(
    () => RestaurantEntity,
    (restaurantEntity: RestaurantEntity) => restaurantEntity.id,
  )
  restaurant: RestaurantEntity;

  @OneToMany(() => Order, (Order) => Order.id)
  Order: Order[];

  @OneToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.id)
  categories: CategoryEntity[];
}
