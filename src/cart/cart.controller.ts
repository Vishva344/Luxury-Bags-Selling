import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CommonResponsePromise } from '../common/types/common.type';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { RequestVerify } from '../common/guards/request-verify.guard';

import { CreateAddToCartDto } from './dtos/create-cart.dto';
import { RoleGuard } from '../common/guards/role.guard';
import { User } from '../users/entities/user.entity';

@UseGuards(RequestVerify, RoleGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@RequestUser() user: User, @Body() createAddToCartDto: CreateAddToCartDto): CommonResponsePromise {
    return this.cartService.addToCart(user, createAddToCartDto);
  }

  @Delete(':id')
  async deleteCart(@RequestUser() user: User, @Param('cartId') cartId: number): CommonResponsePromise {
    return this.cartService.deleteCart(user, cartId);
  }
}
