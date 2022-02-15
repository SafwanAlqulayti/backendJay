import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderCategory } from './order-category.entity';

@Entity('order-category-detail')
export class OrderCategoryDetail extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: string;

  @ManyToOne(
    () => OrderCategory,
    (OrderCategory: OrderCategory) => OrderCategory.id,
  )
  @JoinColumn()
  OrderCategory: OrderCategory;
}
