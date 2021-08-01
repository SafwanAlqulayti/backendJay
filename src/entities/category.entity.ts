
import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { MealEntity } from './meal.entity';
import { RestaurantEntity } from './restaurant.entity';


@Entity()
export class CategoryEntity extends AbstractEntity {

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  categoryOrder: string;

  @ManyToOne(type => RestaurantEntity, Restaurant => Restaurant.id)
  @JoinColumn()
  Restaurant: RestaurantEntity
Î
  @OneToMany(() => MealEntity, (MealEntity: MealEntity) => MealEntity.id)
  MealEntity: MealEntity
}      