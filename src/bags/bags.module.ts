import { Module } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagsController } from './bags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bags } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bags])],
  controllers: [BagsController],
  providers: [BagsService],
})
export class BagsModule {}
