import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Order } from '../typeorm/order.entity';
import { Cart } from '../typeorm/cart.entity';
import { Variant } from '../typeorm/variant.entity';
import { User } from '../typeorm/user.entity';
import { Bag } from '../typeorm/bags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Variant, User, Bag, Order])],
  controllers: [CartController],
  providers: [CartService, JwtService],
})
export class CartModule {}
