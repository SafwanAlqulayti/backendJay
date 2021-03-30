

import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { MealEntity } from "./meal.entity";
import { OrderCategoryDetail } from "./order-category-detail.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity('order-category')
export class OrderCategory extends AbstractEntity {

    @Column({nullable:true})
    name:string;

  

    @ManyToOne(()=> MealEntity ,(MealEntity:MealEntity)=>MealEntity.id)
    @JoinColumn()
    MealEntity:MealEntity


    @OneToMany(()=> OrderCategoryDetail ,(OrderCategoryDetail:OrderCategoryDetail)=>OrderCategoryDetail.id)
    OrderCategoryDetail:OrderCategoryDetail



    
}