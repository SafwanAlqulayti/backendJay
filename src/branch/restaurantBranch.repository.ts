import { CategoryEntity } from "src/entities/category.entity";
import { RestaurantBranchEntity } from "src/entities/restaurantBranch.entity";
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(RestaurantBranchEntity)
export class RestaurantBranchRepository extends Repository<RestaurantBranchEntity> {}