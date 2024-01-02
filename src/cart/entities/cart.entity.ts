import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bag } from '../../bags/entities/bags.entity';
import { User } from '../../users/entities/user.entity';
import { Variant } from '../../variant/entities/variant.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Bag, (bag) => bag.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bagId' })
  bag: Bag;

  @ManyToOne(() => Variant, (variant) => variant.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variantId' })
  variant: Variant;

  // @OneToMany(() => Order, (order) => order.cart)
  // orders: Order[];

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedDate: Date;
}
