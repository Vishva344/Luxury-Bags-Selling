import { Body, Controller, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @Post()
  async createFavorite(@Body() createFavoriteDto: CreateFavoriteDto): Promise<any> {
    return this.favoriteService.createFavorite(createFavoriteDto);
  }
}
