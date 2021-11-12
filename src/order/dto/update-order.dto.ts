import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { OrderStatus } from 'src/constants/order-status';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto   {
    @IsNotEmpty()
    @IsUUID()
    orderId:string

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status:OrderStatus
}
