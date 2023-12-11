import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bag } from './bags.entity';

@Entity({})
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bag)
  @JoinColumn({ name: 'bag_id', referencedColumnName: 'id' })
  bag_id: number;

  // @ManyToOne(() => Bag)
  // @JoinColumn({ name: 'bag_id' })
  // bag_id: Bag;

  @Column()
  stock: string;

  @Column()
  color: string;

  @Column()
  price: string;

  @Column({ type: 'varchar', nullable: true })
  bag_image: string;

  @Column()
  condition: string;

  @Column()
  IsAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
