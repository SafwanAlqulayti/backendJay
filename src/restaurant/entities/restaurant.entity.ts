import { from } from 'rxjs';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {User} from '../../auth/entities/user.entity'

export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  kind: string;

  @Column()
  rate: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  photo: string;


  @OneToOne(type=>User,CASHIER=>CASHIER.Restaurant)
  CASHIER:User;
}
