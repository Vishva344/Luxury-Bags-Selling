import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variant } from '../variant/entities/variant.entity';
import { Cart } from '../cart/entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CommonResponsePromise } from '../common/types/common.type';
import { ResponseHandler } from '../common/response-handler';
import { errorMessages } from '../config/messages.config';
import { Order } from './entities/order.entity';
import { Defaults } from '../config/default.config';
import { GetAllOrderDto } from './dtos/get-order.dto';

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

  async getOrderById(user: User, orderId: number): CommonResponsePromise {
    const orderData: Order = await this.orderRepository
      .createQueryBuilder('order')
      .addSelect([
        'user.name',
        'user.email',
        'variant.color',
        'variant.bag_image',
        'variant.price',
        'variant.condition',
        'cart.quantity',
      ])
      .innerJoin('order.user', 'user')
      .innerJoin('order.variant', 'variant')
      .innerJoin('order.cart', 'cart')
      .where('order.id = :orderId', { orderId })
      .getRawOne();

    return ResponseHandler.success(orderData, 'Order retrieved successfully', HttpStatus.OK);
  }

  async getAllOrder(query: GetAllOrderDto): CommonResponsePromise {
    const page = query.page || Defaults.PAGINATION_PAGE_SIZE;
    const limit = query.limit || Defaults.PAGINATION_LIMIT;
    const skip = (page - 1) * limit;
    const sortValue = query.sortValue || 'updatedAt';
    const sortBy = query.sortBy === 'asc' ? 'ASC' : 'DESC';

    const searchText = query.searchText !== undefined && query.searchText !== null ? `%${query.searchText}%` : '%';

    const ordersData = await this.variantRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.bag', 'b')
      .leftJoin('v.orders', 'o')
      .leftJoin('o.user', 'u')
      .leftJoin('o.cart', 'c')
      .select([
        'v.*',
        'u.name AS username',
        'u.email AS user_email',
        'v.color AS bag_color',
        'v.bag_Image AS bag_image',
        'b.brandName',
        'v.condition AS bag_condition',
        'c.quantity AS cart_quantity',
      ])
      .where('b.id = v.bagId')
      .andWhere('o.variantId = v.id')
      .andWhere('o.userId = u.id')
      .andWhere('o.cartId = c.id')
      .andWhere('(b.brandName LIKE :searchText OR b.bagName LIKE :searchText OR v.color LIKE :searchText)', {
        searchText,
      })
      .skip(skip)
      .take(limit)
      .orderBy(`u.${sortValue}`, sortBy)
      .getRawMany();

    return ResponseHandler.success(ordersData, 'Bags fetched successfully with total pages', HttpStatus.OK);
  }
}
