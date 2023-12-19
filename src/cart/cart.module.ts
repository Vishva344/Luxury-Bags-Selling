import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bag, Cart, User, Variant } from '../typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Variant, User, Bag])],
  controllers: [CartController],
  providers: [CartService, JwtService],
})
export class CartModule {}
