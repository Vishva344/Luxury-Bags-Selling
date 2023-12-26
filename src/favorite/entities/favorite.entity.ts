import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Bag } from '../../bags/entities/bags.entity';
import { User } from '../../users/entities/user.entity';
import { Variant } from '../../variant/entities/variant.entity';

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

  // @Column({
  //   default: false,
  // })
  // isDeleted: boolean;

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
