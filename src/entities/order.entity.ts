import { RestaurantEntity } from "../entities/restaurant.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { OrderStatus } from "src/constants/order-status";
import { AbstractEntity } from "src/common/abstract.entity";



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

    @ManyToOne(tyoe => RestaurantEntity, Restaurant => Restaurant.Order)
    @JoinColumn()
    Restaurant: RestaurantEntity

    @ManyToOne(tyoe => UserEntity, User => User.Order)
    @JoinColumn()
    User: UserEntity
}
