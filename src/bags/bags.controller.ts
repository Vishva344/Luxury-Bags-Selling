import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagTable } from './types/bags.type';
import { CreateBagDto } from './dtos/create-bag.dto';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { CommonResponsePromise } from '../common/types/common.type';
import { UpdateBagDto } from './dtos/update-bag.dto';
import { GetAllBagDto } from './dtos/get-bag.dto';
import { User } from '../typeorm/user.entity';

@UseGuards(RequestVerify)
@Controller('bags')
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  async createBag(@RequestUser() user: User, @Body() createBagDto: CreateBagDto): BagTable {
    return this.bagsService.createBag(user, createBagDto);
  }

  @Post(':bagId')
  async updateBagDetails(
    @RequestUser() user: User,
    @Param('bagId') bagId: number,
    @Body() updateBagDto: UpdateBagDto,
  ): CommonResponsePromise {
    return this.bagsService.updateBagDetails(user, bagId, updateBagDto);
  }

  @Delete(':bagId')
  async deleteBag(@RequestUser() user: User, @Param('bagId') bagId: number): CommonResponsePromise {
    return this.bagsService.deleteBag(user, bagId);
  }

  @Get(':bagId')
  async getBag(@RequestUser() user: User, @Param('bagId') bagId: number): CommonResponsePromise {
    return this.bagsService.getBag(user, bagId);
  }

  @Get()
  async getAllBag(@RequestUser() user: User, @Query() query: GetAllBagDto): CommonResponsePromise {
    return this.bagsService.getAllBag(user, query);
  }
}
