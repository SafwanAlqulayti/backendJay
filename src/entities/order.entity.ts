// import { User } from "src/auth/entities/user.entity";
import { RestaurantEntity } from "../entities/restaurant.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";



@Entity()
export class Order extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    order_number: string;
  
    @Column()
    price: string;



    @ManyToOne(tyoe=>RestaurantEntity,Restaurant=>Restaurant.Order)
    @JoinColumn()
    Restaurant:RestaurantEntity




    @ManyToOne(tyoe=>UserEntity,User=>User.Order)
    @JoinColumn()
    User:UserEntity



}
