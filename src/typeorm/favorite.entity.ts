import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Bag, Variant } from '.';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Bag, (bag) => bag.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bagId' })
  bag: Bag;

  @ManyToOne(() => Variant, (variant) => variant.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variantId' })
  variant: Variant;

  @Column({
    default: false,
  })
  isFavorite: boolean;
}
