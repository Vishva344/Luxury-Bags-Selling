import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Order } from '../order/entities/order.entity';
import { Cart } from './entities/cart.entity';
import { Variant } from '../variant/entities/variant.entity';
import { User } from '../users/entities/user.entity';
import { Bag } from '../bags/entities/bags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Variant, User, Bag, Order])],
  controllers: [CartController],
  providers: [CartService, JwtService],
})
export class CartModule {}
