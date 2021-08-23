

import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { MealEntity } from "./meal.entity";
import { OrderCategoryDetail } from "./order-category-detail.entity";

@Entity('order-category')
export class OrderCategory extends AbstractEntity {

    @Column({nullable:true})
    name:string;
    
    @Column({nullable:true})
    order:string;

    @Column({nullable:false})
    isCheckBox:boolean;

    @ManyToOne(()=> MealEntity ,(MealEntity:MealEntity)=>MealEntity.id)
    @JoinColumn()
    MealEntity:MealEntity

    @OneToMany(()=> OrderCategoryDetail ,(OrderCategoryDetail:OrderCategoryDetail)=>OrderCategoryDetail.OrderCategory)
    OrderCategoryDetail:OrderCategoryDetail
}