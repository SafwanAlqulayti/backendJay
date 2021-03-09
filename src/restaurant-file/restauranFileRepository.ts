import { EntityRepository, Repository } from "typeorm";
import { RestaurantFileEntity} from '../entities/restaurantFile.entity'
@EntityRepository(RestaurantFileEntity)
export class RestauranFileRepository extends Repository<RestaurantFileEntity> {}