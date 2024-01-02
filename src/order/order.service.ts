import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CommonResponsePromise } from '../common/types/common.type';
import { ResponseHandler } from '../common/response-handler';
import { errorMessages } from '../config/messages.config';
import { Order } from './entities/order.entity';
import { Defaults } from '../config/default.config';
import { GetAllOrderDto } from './dtos/get-order.dto';
import { Bid } from '../bid/entities/bid.entity';
import { Bag } from '../bags/entities/bags.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Bid) private readonly bidRepository: Repository<Bid>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createOrder(user: User, createOrderDto: CreateOrderDto): CommonResponsePromise {
    const bid = await this.bidRepository.findOne({ where: { id: createOrderDto.bidId } });
    if (!bid) throw new NotFoundException(errorMessages.NO_VARIANT_FOUND);

    const bag = await this.bagRepository.findOne({ where: { id: createOrderDto.bagId } });
    if (!bag) throw new NotFoundException(errorMessages.BAG_NOT_FOUND);

    const newOrder = {
      user: user,
      bid: bid,
      price: bid.value,
      sellerId: bid.sellerId,
      deliveryOption: createOrderDto.deliveryOption,
    };
    console.log('🚀 ~ file: order.service.ts:38 ~ OrderService ~ createOrder ~ newOrder:', newOrder);
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
    const orderList = await this.orderRepository.createQueryBuilder('order').addSelect(['order.*']);

    return ResponseHandler.success(orderList, 'Bags fetched successfully with total pages', HttpStatus.OK);
  }
}
