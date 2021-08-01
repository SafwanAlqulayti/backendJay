import { AbstractEntity } from "src/common/abstract.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { OrderCategory } from "./order-category.entity";
import { Order } from "./order.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity('meal')

export class MealEntity extends AbstractEntity {

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    price: string;


    @Column({
        nullable: true,
        default: true
    })
    isAvilable: boolean;


    @Column({ nullable: true })
    image: string

    // @ManyToOne(()=>RestaurantEntity ,(restaurantEntity:RestaurantEntity)=>restaurantEntity.id)
    // restaurantId: RestaurantEntity


    @ManyToOne(() => CategoryEntity, (CategoryEntity: CategoryEntity) => CategoryEntity.id)
    @JoinColumn()
    CategoryId: CategoryEntity


    @OneToMany(() => OrderCategory, (OrderCategory: OrderCategory) => OrderCategory.id)
    OrderId: OrderCategory

    @ManyToMany(() => Order, (order:Order) => order.id )

    @ManyToMany(() =>  Order, (order:Order) => order.meals )
    @JoinTable({
        name: 'meal_order',
        joinColumn: {
            name: 'meal',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'order',
            referencedColumnName: 'id',
        },
    })
   @JoinColumn({ name: 'orderEntity' })
    orders: Order[];
}