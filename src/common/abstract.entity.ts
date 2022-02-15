import { UUID } from 'aws-sdk/clients/inspector';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true, default: false })
  IsActive: boolean;
}
