import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { Bid } from '../bid/entities/bid.entity';
import { Bag } from '../bags/entities/bags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart, Bag, User, Bid])],
  controllers: [OrderController],
  providers: [OrderService, JwtService],
})
export class OrderModule {}
