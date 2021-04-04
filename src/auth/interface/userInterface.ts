import { UserRole } from "aws-sdk/clients/workmail";
import { Order } from "src/entities/order.entity";
import { RestaurantEntity } from "src/entities/restaurant.entity";

export interface UserInterFace {
    id:string;
    
    email: string;

    user_name: string;

    password: string;

    salt: string;

    phone_number :string;
 
    user_role:UserRole;

    Order:Order[];

    Restaurant:RestaurantEntity[]
}