import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from '../typeorm/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Variant } from '../typeorm/variant.entity';
import { User } from '../typeorm/user.entity';
import { Bag } from '../typeorm/bags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Variant, Bag, User])],
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtService],
})
export class FavoriteModule {}
