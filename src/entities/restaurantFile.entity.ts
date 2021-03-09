import { Json } from "aws-sdk/clients/robomaker";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";

@Entity('resraurantFile')
export class RestaurantFileEntity {
    @PrimaryGeneratedColumn()
    id:string;
    @Column({nullable:true})
    menue:string;
    @Column({nullable:true})
    offers:string;
    @Column({nullable:true})
    photos:string;

    @Column({nullable:true})
    bucket:string;

    @OneToMany(()=>RestaurantEntity ,(restaurantEntity:RestaurantEntity)=> restaurantEntity.id)
    restaurants:RestaurantEntity[];
    
}