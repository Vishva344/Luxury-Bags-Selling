import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, DeleteDateColumn, Int32 } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';
import { Variant } from '../../variant/entities/variant.entity';
import { DeliveryOption } from '../order.type';
import { Bid } from '../../bid/entities/bid.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  sellerId: number;

  @Column()
  price: number;

  // @ManyToOne(() => Variant, (variant) => variant.orders)
  // @JoinColumn({ name: 'variantId' })
  // variant: Variant;

  // @ManyToOne(() => Cart, (cart) => cart.orders)
  // @JoinColumn({ name: 'cartId' })
  // cart: Cart;
  @ManyToOne(() => Bid, (bid) => bid.orders)
  @JoinColumn({ name: 'bidId' })
  bid: Bid;

  @Column({
    type: 'enum',
    enum: DeliveryOption,
    default: DeliveryOption.DELIVERY_BY_SELLER,
  })
  deliveryOption: DeliveryOption;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedDate: Date;
}
