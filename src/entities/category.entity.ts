
import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';


@Entity()
export class CategoryEntity extends AbstractEntity {

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  order: string;



  @ManyToOne(tyoe=>RestaurantEntity,Restaurant=>Restaurant.categoryEntity)
    @JoinColumn()
    Restaurant:RestaurantEntity
}