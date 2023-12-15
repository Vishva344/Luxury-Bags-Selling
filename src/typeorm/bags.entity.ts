import { BagCategory, BagType, DataType, Gender } from 'src/bags/types/bags.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Variant } from './variant.entity';
import { Favorite } from './favorite.entity';
import { Cart } from './cart.entity';

@Entity()
export class Bag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bags)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ length: 40, nullable: true })
  bagName: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  brandName: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  bag_information: string;

  @Column({
    type: 'enum',
    enum: BagType,
    default: BagType.OTHER,
  })
  bag_type: BagType;

  @Column({
    type: 'enum',
    enum: BagCategory,
    default: BagCategory.OTHER,
  })
  bag_category: BagCategory;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.KIDS,
  })
  gender: Gender;

  @Column({ type: 'json', nullable: true })
  offers: DataType[];

  @Column({ type: 'varchar', length: 40, nullable: true })
  bag_size: string;

  @OneToMany(() => Variant, (variant) => variant.bag)
  variants: Variant[];

  @OneToMany(() => Favorite, (favorite) => favorite.bag)
  favorites: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.bag)
  carts: Cart[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
