import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Variant } from '../variant/entities/variant.entity';
import { User } from '../users/entities/user.entity';
import { Bag } from '../bags/entities/bags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Variant, Bag, User])],
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtService],
})
export class FavoriteModule {}
