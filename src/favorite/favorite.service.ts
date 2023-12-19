import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from '../typeorm/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { Bag, User, Variant } from '../typeorm';
import { ResponseHandler } from '../common/response-handler';
import { CommonResponsePromise } from '../common/types/common.type';
import { errorMessages } from '../config/messages.config';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Variant) private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createFavorite(user: User, createFavoriteDto: CreateFavoriteDto): CommonResponsePromise {
    const bag = await this.bagRepository.findOne({ where: { id: createFavoriteDto.bagId } });
    if (!bag) throw new NotFoundException('bag is not found');

    const variant = await this.variantRepository.findOne({ where: { id: createFavoriteDto.variantId } });
    if (!variant) throw new NotFoundException('variant is not found');

    const newFav = {
      user: user,
      bag: bag,
      variant: variant,
    };
    await this.favoriteRepository.save(newFav);
    return ResponseHandler.success(newFav, 'bag added successfully', HttpStatus.OK);
  }

  async removeFavorite(user: User, favoriteId: number): CommonResponsePromise {
    const favoriteData = await this.favoriteRepository.findBy({ id: favoriteId });

    if (!favoriteData) throw new NotFoundException(errorMessages.NO_FAVORITE_FOUND);
    const deleteFavorite = await this.favoriteRepository.softDelete({ id: favoriteId });
    if (!deleteFavorite.affected) throw new BadRequestException(errorMessages.FAVORITE_NOT_DELETED);
    return ResponseHandler.success(deleteFavorite, 'Favorite removed successfully', HttpStatus.OK);
  }
}
