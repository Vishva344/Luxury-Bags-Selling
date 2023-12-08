import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bag } from './bags.entity';

@Entity()
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bag)
  @JoinColumn({ name: 'bag_id', referencedColumnName: 'id' })
  bag: Bag;

  @Column()
  stock: string;

  @Column()
  color: string;

  @Column()
  Price: string;

  @Column()
  bag_image: string;

  @Column()
  condition: string;

  @Column()
  IsAvailable: boolean;
}
