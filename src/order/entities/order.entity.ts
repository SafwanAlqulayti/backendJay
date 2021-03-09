import { User } from "src/auth/entities/user.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Order extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    order_number: string;
  
    @Column()
    price: string;



    @ManyToOne(tyoe=>Restaurant,Restaurant=>Restaurant.Order)
    @JoinColumn()
    Restaurant:Restaurant




    @ManyToOne(tyoe=>User,User=>User.Order)
    @JoinColumn()
    User:User



}
