import { Body, Query, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CommonResponsePromise } from '../common/types/common.type';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '../users/entities/user.entity';
import { GetAllOrderDto } from './dtos/get-order.dto';

@UseGuards(RequestVerify, RoleGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@RequestUser() user: User, @Body() createOrderDto: CreateOrderDto): CommonResponsePromise {
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get(':orderId')
  async getOrderById(@RequestUser() user: User, @Param('orderId') orderId: number): CommonResponsePromise {
    return this.orderService.getOrderById(user, orderId);
  }

  @Get()
  async getAllOrder(@Query() query: GetAllOrderDto): CommonResponsePromise {
    console.log(query, '*************************');

    return this.orderService.getAllOrder(query);
  }
}
