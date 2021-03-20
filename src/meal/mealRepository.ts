import { MealEntity } from "src/entities/meal.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(MealEntity)

export class MealRepository extends Repository<MealEntity>{}