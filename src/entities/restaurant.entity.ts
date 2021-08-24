
import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Order } from './order.entity';
import { RestaurantCashire } from './restaurant-cashire.entity';
import { RestaurantBranchEntity } from './restaurantBranch.entity';
import { RestaurantFileEntity } from './restaurantFile.entity';
import { UserEntity } from './user.entity';

@Entity()
export class RestaurantEntity extends AbstractEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  kind: string;

  @ManyToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.id)
  userId: UserEntity

  @Column({ nullable: true })
  rate: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  image: string;

  @Column({nullable:true})
  isClosed:boolean;

  @Column({nullable:true})
  openHour:number;

  @Column({nullable:true})
  closeHour:number;

  @OneToOne(type => RestaurantCashire, RestaurantCashire => RestaurantCashire.Restaurant)
  RestaurantCashire: RestaurantCashire

  @ManyToOne(() => RestaurantFileEntity, (restaurantFile: RestaurantFileEntity) => restaurantFile.id)
  restaurantFile: RestaurantFileEntity;

  @ManyToOne(() => RestaurantEntity, (restaurantEntity: RestaurantEntity) => restaurantEntity.id)
  restaurant: RestaurantEntity;

  @OneToMany(() => Order, Order => Order.id)
  Order: Order[]

  @OneToMany(() => CategoryEntity, categoryEntity => categoryEntity.RestaurantEntity)
  categories: CategoryEntity[]

  // @OneToMany(type=>RestaurantBranchEntity , RestaurantBranchEntity=>RestaurantBranchEntity.restaurant)
  // RestaurantBranchEntity:RestaurantBranchEntity[]
}
    // @OneToOne(type=>User,CASHIER=>CASHIER.Restaurant)
 // CASHIER:User;

  // @ManyToOne(()=>RestaurantFileEntity ,(restaurantFile:RestaurantFileEntity)=> restaurantFile)
  // restaurantFile:RestaurantFileEntity;
 


