import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Order } from '../entities/order.entity';
import { RestaurantCashire } from '../entities/restaurant-cashire.entity';
import { RestaurantBranchEntity } from '../entities/restaurantBranch.entity';
import { RestaurantFileEntity } from '../entities/restaurantFile.entity';
import { UserEntity } from '../entities/user.entity';

@Entity()
export class RestaurantEntity extends AbstractEntity {
  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  kind: string;

  @ManyToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.id)
  userId: UserEntity;

  @ApiProperty()
  @Column({ nullable: true })
  rate: string;

  @ApiProperty()
  @Column({ nullable: true })
  mainCourseImage: string; //الوجبة الشهية
  
  @ApiProperty()
  @Column({ nullable: true })
  latitude: string;

  @ApiProperty()
  @Column({ nullable: true })
  longitude: string;

  @ApiProperty()
  @Column({ nullable: true })
  image: string;

  @ApiProperty()
  @Column({ nullable: true })
  isClosed: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  openHour: number;

  @ApiProperty()
  @Column({ nullable: true })
  closeHour: number;

  @ApiProperty()
  @Column({ nullable: true })
  isDeleted: boolean;

  @OneToOne(
    (type) => RestaurantCashire,
    (RestaurantCashire) => RestaurantCashire.Restaurant,
  )
  RestaurantCashire: RestaurantCashire;

  @ManyToOne(
    () => RestaurantFileEntity,
    (restaurantFile: RestaurantFileEntity) => restaurantFile.id,
  )
  restaurantFile: RestaurantFileEntity;

  // @ManyToOne(
  //   () => RestaurantEntity,
  //   (restaurantEntity: RestaurantEntity) => restaurantEntity.id,
  // )
  // restaurant: RestaurantEntity;

  @OneToMany(() => Order, (Order) => Order.id)
  Order: Order[];

  @OneToMany(
    () => CategoryEntity,
    (categoryEntity) => categoryEntity.RestaurantEntity,
  )
  categories: CategoryEntity[];

  // @OneToMany(type=>RestaurantBranchEntity , RestaurantBranchEntity=>RestaurantBranchEntity.restaurant)
  // RestaurantBranchEntity:RestaurantBranchEntity[]
}
// @OneToOne(type=>User,CASHIER=>CASHIER.Restaurant)
// CASHIER:User;

// @ManyToOne(()=>RestaurantFileEntity ,(restaurantFile:RestaurantFileEntity)=> restaurantFile)
// restaurantFile:RestaurantFileEntity;
