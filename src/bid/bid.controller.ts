import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dtos/create-bid.dto';
import { Roles } from '../common/decorators/role.decorator';
import { CommonResponsePromise, Role } from '../common/types/common.type';
import { RoleGuard } from '../common/guards/role.guard';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from '../users/entities/user.entity';
import { UpdateBidDto } from './dtos/update-bid.dto';
import { GetAllBidDto } from './dtos/get-AllBid.dto';

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

  @Get('AllBid/:id')
  async getAllBid(@Param('id') userId: number, @Query() query: GetAllBidDto): CommonResponsePromise {
    return this.bidService.getAllBid(userId, query);
  }

  @Get('bids/:id')
  async getSellerBid(@Param('id') bagId: number, @Query() query: GetAllBidDto): CommonResponsePromise {
    return this.bidService.getSellerBid(bagId, query);
  }

  @Post('status/:id')
  async updateBidStatus(@Param('bidId') bidId: number, updateBidDto: UpdateBidDto): CommonResponsePromise {
    return this.bidService.updateBidStatus(bidId, updateBidDto);
  }
}
