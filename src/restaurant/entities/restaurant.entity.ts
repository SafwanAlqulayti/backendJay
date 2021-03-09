import { type } from 'os';
import { from } from 'rxjs';
import { RestaurantCashire } from 'src/restaurant-cashire/entities/restaurant-cashire.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {User} from '../../auth/entities/user.entity'
import {Order} from '../../order/entities/order.entity'



@Entity()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  kind: string;

  @Column()
  rate: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  photo: string;


  @ManyToOne(type=>User,CASHIER=>CASHIER.Restaurant, {eager: true})
  @JoinColumn()
  CASHIER:User;



  @OneToOne(type=>RestaurantCashire,RestaurantCashire=>RestaurantCashire.Restaurant, {eager: false})
  RestaurantCashire:RestaurantCashire


  @OneToMany(type=>Order,Order=>Order.Restaurant)
  Order:Order[]
}
