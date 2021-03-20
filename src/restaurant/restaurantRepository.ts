import { RestaurantEntity } from "src/entities/restaurant.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RestaurantEntity)
export class RestaurantRepository extends Repository<RestaurantEntity>{}