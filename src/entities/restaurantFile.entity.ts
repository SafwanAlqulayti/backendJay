import { Json } from "aws-sdk/clients/robomaker";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";
import { RestaurantBranchEntity } from "./restaurantBranch.entity";

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
    mainCourse:boolean;
    @Column({nullable:true})
    bucket:string;
    @OneToMany(()=>RestaurantBranchEntity ,(restaurantBranchEntity:RestaurantBranchEntity)=> restaurantBranchEntity.id)
    @JoinColumn({name:"restaurantBranches"})
    restaurantBranches:RestaurantBranchEntity[];
    
}