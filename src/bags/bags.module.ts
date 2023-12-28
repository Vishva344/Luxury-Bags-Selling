import { Module } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagsController } from './bags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bag } from './entities/bags.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Offer } from '../offer/entities/offers.entity';
import { Photo } from '../image/entities/image.entity';
import { Bid } from '../bid/entities/bid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bag, User, Offer, Photo, Bid])],
  controllers: [BagsController],
  providers: [BagsService, JwtService],
})
export class BagsModule {}
