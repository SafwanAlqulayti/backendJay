
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from '../auth/user-role.enum'
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from "src/common/abstract.entity";
import { Order } from "./order.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity()
// @Unique(['email'])
// @Unique(['phoneNumber'])
export class UserEntity extends AbstractEntity {

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    user_name: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    salt: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ nullable: true })
    user_role: UserRole;


    @OneToMany(type => Order, Order => Order.User)
    Order: Order[];



    @OneToMany(type => RestaurantEntity, Restaurant => Restaurant.userId)
    Restaurant: RestaurantEntity[];


    // @OneToOne(type =>Restaurant,Restaurant=>Restaurant)
    // @JoinColumn()
    // Restaurant:Restaurant;


    async validateLogin(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);


        return hash === this.password

    }
}
