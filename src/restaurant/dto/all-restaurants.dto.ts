import { RestaurantEntity } from 'src/restaurant/restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';
export class AllRestaurantsDto {
    @ApiProperty({
        type: RestaurantEntity,
    })
    readonly data: RestaurantEntity[];
}