import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variant } from '../typeorm/variant.entity';
import { Cart } from '../typeorm/cart.entity';
import { User } from '../typeorm/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CommonResponsePromise } from '../common/types/common.type';
import { ResponseHandler } from '../common/response-handler';
import { errorMessages } from '../config/messages.config';
import { Order } from '../typeorm/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Variant) private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createOrder(user: User, createOrderDto: CreateOrderDto): CommonResponsePromise {
    const variant = await this.variantRepository.findOne({ where: { id: createOrderDto.variantId } });
    if (!variant) throw new NotFoundException(errorMessages.NO_VARIANT_FOUND);

    const cart = await this.cartRepository.findOne({ where: { id: createOrderDto.cartId } });
    if (!cart) throw new NotFoundException(errorMessages.NO_CART_FOUND);

    const newOrder = {
      cart: cart,
      user: user,
      variant: variant,
      deliveryOption: createOrderDto.deliveryOption,
    };
    const order = await this.orderRepository.save(newOrder);
    return ResponseHandler.success(order, 'create order successFully.', HttpStatus.OK);
  }
}
