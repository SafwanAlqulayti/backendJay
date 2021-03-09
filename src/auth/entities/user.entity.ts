
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import {UserRole} from '../user-role.enum'
import * as bcrypt from 'bcryptjs';
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { Order } from "src/order/entities/order.entity";

@Entity()
// @Unique(['email'])
// @Unique(['phoneNumber'])
export class User extends BaseEntity {

     

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    phone_number :string;
 
    @Column()
    user_role:UserRole;


    @OneToMany(type =>Restaurant,Restaurant=>Restaurant.CASHIER,{eager: false})
    Restaurant:Restaurant[];



    @OneToMany(type =>Order,Order=>Order.User)
    Order:Order[];
    


     async validateLogin(password:string):Promise<boolean>{
        const hash=await bcrypt.hash(password,this.salt);


        return hash===this.password
        
            }

 

}
 