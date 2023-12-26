import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonResponsePromise } from '../common/types/common.type';
import { ResponseHandler } from '../common/response-handler';
import { CreateAddToCartDto } from './dtos/create-cart.dto';
import { errorMessages } from '../config/messages.config';
import { Variant } from '../variant/entities/variant.entity';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { Bag } from '../bags/entities/bags.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Variant) private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async addToCart(user: User, createAddToCartDto: CreateAddToCartDto): CommonResponsePromise {
    const bag = await this.bagRepository.findOne({ where: { id: createAddToCartDto.bagId } });
    if (!bag) throw new NotFoundException('bag is not found');

    const variant = await this.variantRepository.findOne({ where: { id: createAddToCartDto.variantId } });
    if (!variant) throw new NotFoundException('variant is not found');

    const cartData = {
      user: user,
      bag: bag,
      variant: variant,
      price: variant.price,
      quantity: createAddToCartDto.quantity,
    };

    const cart = await this.cartRepository.save(cartData);
    return ResponseHandler.success(cart, 'Item added to cart successfully.', HttpStatus.OK);
  }

  async deleteCart(user: User, cartId: number): CommonResponsePromise {
    const cart = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!cart) throw new NotFoundException('bag is not found');

    const deleteResult = await this.cartRepository.delete({ id: cartId });
    if (!deleteResult.affected) throw new BadRequestException(errorMessages.CART_NOT_DELETED);
    return ResponseHandler.success(cart, 'Item deleted to cart successfully.', HttpStatus.OK);
  }
}
