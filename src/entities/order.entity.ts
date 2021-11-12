import { RestaurantEntity } from "../entities/restaurant.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { OrderStatus } from "src/constants/order-status";
import { AbstractEntity } from "src/common/abstract.entity";
import { MealEntity } from "./meal.entity";
import { RestaurantBranchEntity } from "./restaurantBranch.entity";



@Entity()
export class Order extends AbstractEntity {

    @Column({nullable:true})
    order_number: string;

    @Column({nullable:true})
    price: number;

    @Column({nullable:true,
        type:'enum',
        enum: OrderStatus,
    })
    status: OrderStatus;

    @Column({nullable:true})
    note:string
    
    @ManyToOne(tyoe => RestaurantEntity, restaurantEntity => restaurantEntity.Order)
    @JoinColumn()
    restaurant: RestaurantEntity

    @ManyToOne(tyoe => UserEntity, User => User.Order)
    @JoinColumn()
    user: UserEntity;

    @ManyToMany(() => MealEntity, (mealEntity:MealEntity) => mealEntity.orders)
    meals:MealEntity[];
}
