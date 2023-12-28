import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Bid } from './entities/bid.entity';
import { Bag } from '../bags/entities/bags.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bid, Bag])],
  controllers: [BidController],
  providers: [BidService, JwtService],
})
export class BidModule {}
