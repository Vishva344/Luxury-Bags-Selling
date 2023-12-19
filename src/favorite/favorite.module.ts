import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from '../typeorm/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bag, User, Variant } from '../typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Variant, Bag, User])],
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtService],
})
export class FavoriteModule {}
