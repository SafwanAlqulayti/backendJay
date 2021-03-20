import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";

@Entity('meal')

export class MealEntity extends AbstractEntity {

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    price:string;

    @Column({nullable:false})
    category:string;

    @Column({nullable:false})
    isAvilable:boolean;

    @Column({nullable:false})
    aa:boolean;
    
    @ManyToOne(()=>RestaurantEntity ,(restaurantEntity:RestaurantEntity)=>restaurantEntity.id)
    restaurantId: RestaurantEntity
}