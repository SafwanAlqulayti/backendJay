import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/abstract.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
@Entity()
export class RestaurantCashire extends AbstractEntity {
  @ApiProperty()
  @Column()
  user_name: string;

  @ApiProperty()
  @Column()
  password: string;

  @OneToOne((type) => RestaurantEntity, (Restaurant) => Restaurant.id)
  @JoinColumn()
  Restaurant: RestaurantEntity;
}
