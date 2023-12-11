import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Bag, Variant } from '.';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buyer_id' })
  buyer_id: number;

  @ManyToOne(() => Bag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bag_id' })
  bag_id: number;

  @ManyToOne(() => Variant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  variant_id: number;

  @Column({
    default: true,
  })
  isFavorite: boolean;
}
