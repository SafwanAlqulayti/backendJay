import { type } from 'os';
import { from } from 'rxjs';
import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { RestaurantCashire } from './restaurant-cashire.entity';
import { RestaurantFileEntity } from './restaurantFile.entity';
import {  UserEntity } from './user.entity';

@Entity()
export class RestaurantEntity extends AbstractEntity {

  @Column({nullable:false})
  name: string;

  @Column({nullable:false})
  kind: string;

  @Column({nullable:true})
  rate: string;

  @Column({nullable:true})
  latitude: string;

  @Column({nullable:true})
  longitude: string;

  @Column({nullable:true})
  photo: string;


  // @OneToOne(type=>User,CASHIER=>CASHIER.Restaurant)
 // CASHIER:User;

  @ManyToOne(()=>RestaurantFileEntity ,(restaurantFile:RestaurantFileEntity)=> restaurantFile.id)
  restaurantFile:RestaurantFileEntity;

  @ManyToOne(()=>UserEntity ,(userEntity:UserEntity)=> userEntity.id)
  userId:UserEntity


  @OneToMany(type=>Order,Order=>Order.Restaurant)
  Order:Order[]



  @OneToOne(type=>RestaurantCashire,RestaurantCashire=>RestaurantCashire.Restaurant)
  RestaurantCashire:RestaurantCashire
}
