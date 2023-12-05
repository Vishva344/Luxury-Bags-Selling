import { BagCategory, BagType, Gender } from 'src/bags/types/bags.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  bagName: string;

  @Column({ length: 40 })
  brandName: string;

  @Column({ length: 40 })
  bag_information: string;

  @Column({
    type: 'enum',
    enum: BagType,
    default: BagType.Other,
  })
  bag_type: BagType;

  @Column({
    type: 'enum',
    enum: BagCategory,
    default: BagCategory.Other,
  })
  bag_category: BagCategory;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({ type: 'json', nullable: true })
  offers: object[];

  @Column({ length: 40 })
  bag_size: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
