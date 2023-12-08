import { Module } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagsController } from './bags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bag } from '../typeorm/bags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bag])],
  controllers: [BagsController],
  providers: [BagsService],
})
export class BagsModule {}
