import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from '../typeorm/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { Bag, User, Variant } from '../typeorm';
import { ResponseHandler } from '../common/response-handler';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Variant) private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createFavorite(createFavoriteDto: CreateFavoriteDto): Promise<any> {
    const bag = await this.bagRepository.findOne({ where: { id: createFavoriteDto.bagId } });
    if (!bag) throw new NotFoundException('bag is not found');

    const user = await this.userRepository.findOne({ where: { id: createFavoriteDto.userId } });
    if (!user) throw new NotFoundException('user is not found');

    const variant = await this.variantRepository.findOne({ where: { id: createFavoriteDto.variantId } });
    if (!variant) throw new NotFoundException('variant is not found');
    const newFav = {
      userId: createFavoriteDto.userId,
      bagId: createFavoriteDto.bagId,
      variantId: createFavoriteDto.variantId,
      isFavorite: createFavoriteDto.isFavorite,
    };
    await this.favoriteRepository.save(newFav);
    return ResponseHandler.success(newFav, 'bag added successfully', HttpStatus.OK);
  }
}
