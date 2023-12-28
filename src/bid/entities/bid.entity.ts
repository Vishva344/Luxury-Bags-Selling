import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BidStatus } from '../bid.types';
import { User } from '../../users/entities/user.entity';
import { Bag } from '../../bags/entities/bags.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BidStatus,
    default: BidStatus.INACTIVE,
  })
  bidStatus: BidStatus;

  @Column()
  bid: number;

  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Bag, (bag) => bag.bids)
  @JoinColumn({ name: 'bagId' })
  bag: Bag;

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
