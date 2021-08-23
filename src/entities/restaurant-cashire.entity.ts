
import { AbstractEntity } from "src/common/abstract.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";
@Entity()
export class RestaurantCashire extends AbstractEntity {
  @Column()
  user_name: string;

  @Column()
  password: string;

  @OneToOne(type => RestaurantEntity, Restaurant => Restaurant.id)
  @JoinColumn()
  Restaurant: RestaurantEntity;
}
