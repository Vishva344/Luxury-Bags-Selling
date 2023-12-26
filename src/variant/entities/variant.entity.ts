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
import { Favorite } from '../../favorite/entities/favorite.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Bag)
  // @JoinColumn({ name: 'bagId', referencedColumnName: 'id' })
  // bag_id: number;

  @ManyToOne(() => Bag, (bag) => bag.variants, { nullable: false })
  @JoinColumn({ name: 'bagId' })
  bag: Bag;

  @Column()
  stock: string;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column({ type: 'json', nullable: true })
  bag_image: string[];

  @Column()
  condition: string;

  @Column({ default: true })
  IsAvailable: boolean;

  @OneToMany(() => Favorite, (favorite) => favorite.variant)
  favorites: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.variant)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.variant)
  orders: Order[];

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
