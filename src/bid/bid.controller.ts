import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dtos/create-bid.dto';
import { Roles } from '../common/decorators/role.decorator';
import { CommonResponsePromise, Role } from '../common/types/common.type';
import { RoleGuard } from '../common/guards/role.guard';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from '../users/entities/user.entity';
import { UpdateBidDto } from './dtos/update-bid.dto';

@UseGuards(RequestVerify, RoleGuard)
@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  @Roles(Role.BUYER)
  async createBid(@RequestUser() user: User, @Body() createBidDto: CreateBidDto): CommonResponsePromise {
    return this.bidService.createBid(user, createBidDto);
  }

  @Post(':bidId')
  @Roles(Role.BUYER)
  async updateBid(
    @RequestUser() user: User,
    @Param('bidId') bidId: number,
    @Body() updateBidDto: UpdateBidDto,
  ): CommonResponsePromise {
    return this.bidService.updateBid(user, bidId, updateBidDto);
  }

  @Get(':id')
  @Roles(Role.BUYER, Role.SELLER)
  async getBid(@RequestUser() user: User, @Param('id') bidId: number): CommonResponsePromise {
    return this.bidService.getBid(user, bidId);
  }
}