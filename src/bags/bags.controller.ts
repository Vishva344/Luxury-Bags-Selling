import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BagsService } from './bags.service';
import { CreateBagDto } from './dtos/create-bag.dto';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { CommonResponsePromise, Role } from '../common/types/common.type';
import { UpdateBagDto } from './dtos/update-bag.dto';
import { GetAllBagDto } from './dtos/get-bag.dto';
import { User } from '../users/entities/user.entity';
import { Roles } from '../common/decorators/role.decorator';
import { RoleGuard } from '../common/guards/role.guard';

@UseGuards(RequestVerify, RoleGuard)
@Controller('bags')
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  @Roles(Role.SELLER)
  async createBag(@RequestUser() user: User, @Body() createBagDto: CreateBagDto): CommonResponsePromise {
    return this.bagsService.createBag(user, createBagDto);
  }

  @Post(':bagId')
  @Roles(Role.BUYER, Role.SELLER)
  async updateBagDetails(
    @RequestUser() user: User,
    @Param('bagId') bagId: number,
    @Body() updateBagDto: UpdateBagDto,
  ): CommonResponsePromise {
    return this.bagsService.updateBagDetails(user, bagId, updateBagDto);
  }

  @Delete(':bagId')
  @Roles(Role.SELLER)
  async deleteBag(@RequestUser() user: User, @Param('bagId') bagId: number): CommonResponsePromise {
    return this.bagsService.deleteBag(user, bagId);
  }

  @Get(':bagId')
  @Roles(Role.SELLER)
  async getBag(@RequestUser() user: User, @Param('bagId') bagId: number): CommonResponsePromise {
    return this.bagsService.getBag(user, bagId);
  }

  @Get()
  @Roles(Role.SELLER)
  async getAllBag(@RequestUser() user: User, @Query() query: GetAllBagDto): CommonResponsePromise {
    return this.bagsService.getAllBag(user, query);
  }
}
