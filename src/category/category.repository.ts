import { CategoryEntity } from 'src/entities/category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { RestaurantFileEntity } from '../entities/restaurantFile.entity';
@EntityRepository(CategoryEntity)
export class CategoryRepo extends Repository<CategoryEntity> {}
