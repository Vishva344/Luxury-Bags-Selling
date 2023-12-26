import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, DeleteDateColumn } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';
import { Variant } from '../../variant/entities/variant.entity';
import { DeliveryOption } from '../order.type';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Variant, (variant) => variant.orders)
  @JoinColumn({ name: 'variantId' })
  variant: Variant;

  @ManyToOne(() => Cart, (cart) => cart.orders)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column({
    type: 'enum',
    enum: DeliveryOption,
    default: DeliveryOption.DELIVERY_BY_SELLER,
  })
  deliveryOption: DeliveryOption;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedDate: Date;
}
