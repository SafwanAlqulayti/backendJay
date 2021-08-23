
import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { MealEntity } from './meal.entity';
import { RestaurantEntity } from './restaurant.entity';
import { RestaurantBranchEntity } from './restaurantBranch.entity';


@Entity()
export class CategoryEntity extends AbstractEntity {

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  categoryOrder: string;

  @ManyToOne(type => RestaurantBranchEntity, restaurantBranchEntity => restaurantBranchEntity.categories)
  @JoinColumn()
  restaurantsBranches: RestaurantBranchEntity

  @OneToMany(() => MealEntity, (MealEntity: MealEntity) => MealEntity.id)
  @JoinColumn({name:'mealId'})
  MealEntity: MealEntity
}      