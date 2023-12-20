import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CommonResponsePromise } from '../common/types/common.type';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '../typeorm/user.entity';

@UseGuards(RequestVerify, RoleGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@RequestUser() user: User, @Body() createOrderDto: CreateOrderDto): CommonResponsePromise {
    return this.orderService.createOrder(user, createOrderDto);
  }
}
