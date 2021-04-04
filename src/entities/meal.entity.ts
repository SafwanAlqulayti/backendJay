import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { OrderCategory } from "./order-category.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity('meal')

export class MealEntity extends AbstractEntity {

    @Column({nullable:true})
    name:string;

    @Column({nullable:true})
    price:string;


    @Column({nullable:true})
    isAvilable:boolean;

    @Column({nullable:true})
    aa:boolean;

    // @Column({nullable:true})
    // images:string
    
    @ManyToOne(()=>RestaurantEntity ,(restaurantEntity:RestaurantEntity)=>restaurantEntity.id)
    restaurantId: RestaurantEntity

    
    @ManyToOne(()=>CategoryEntity ,(CategoryEntity:CategoryEntity)=>CategoryEntity.id)
    @JoinColumn()
    CategoryId: CategoryEntity


    @OneToMany(()=> OrderCategory ,(OrderCategory:OrderCategory)=>OrderCategory.id)
    OrderId:OrderCategory
    
}