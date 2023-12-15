import { Module } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagsController } from './bags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bag } from '../typeorm/bags.entity';
import { User } from '../typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Bag, User])],
  controllers: [BagsController],
  providers: [BagsService, JwtService],
})
export class BagsModule {}
