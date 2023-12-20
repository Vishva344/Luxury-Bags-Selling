import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { User } from './user.entity';
import { Variant } from './variant.entity';
import { DeliveryOption } from '../order/order.type';

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
}
