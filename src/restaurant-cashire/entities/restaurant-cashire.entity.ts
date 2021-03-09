
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class RestaurantCashire extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_name: string;
  
    @Column()
    password: string;
  
  


    @OneToOne(type=>Restaurant,Restaurant=>Restaurant.RestaurantCashire, {eager: true})
      @JoinColumn()
    Restaurant:Restaurant;



}
