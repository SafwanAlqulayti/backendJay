
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";


@Entity()
export class RestaurantCashire extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_name: string;
  
    @Column()
    password: string;
  
  


    @OneToOne(type=>RestaurantEntity,Restaurant=>Restaurant.RestaurantCashire)
      @JoinColumn()
    Restaurant:RestaurantEntity;



}
