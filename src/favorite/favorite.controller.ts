import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from '../typeorm/user.entity';
import { RequestVerify } from '../common/guards/request-verify.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { CommonResponsePromise } from '../common/types/common.type';

@UseGuards(RequestVerify, RoleGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async createFavorite(@RequestUser() user: User, @Body() createFavoriteDto: CreateFavoriteDto): CommonResponsePromise {
    return this.favoriteService.createFavorite(user, createFavoriteDto);
  }

  @Delete(':id')
  async removeFavorite(@RequestUser() user: User, @Param('id') favoriteId: number): CommonResponsePromise {
    return this.favoriteService.removeFavorite(user, favoriteId);
  }
}
