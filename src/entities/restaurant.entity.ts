
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

 

  @OneToOne(type => RestaurantCashire, RestaurantCashire => RestaurantCashire.Restaurant)
  RestaurantCashire: RestaurantCashire




  @OneToMany(type=>RestaurantBranchEntity , RestaurantBranchEntity=>RestaurantBranchEntity.restaurant)
  RestaurantBranchEntity:RestaurantBranchEntity[]
}
    // @OneToOne(type=>User,CASHIER=>CASHIER.Restaurant)
 // CASHIER:User;

  // @ManyToOne(()=>RestaurantFileEntity ,(restaurantFile:RestaurantFileEntity)=> restaurantFile)
  // restaurantFile:RestaurantFileEntity;
