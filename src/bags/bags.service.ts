import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bag } from '../typeorm/bags.entity';
import { CreateBagDto } from './dtos/create-bag.dto';
import { ResponseHandler } from '../common/response-handler';
import { errorMessages } from '../config/messages.config';
import { UpdateBagDto } from './dtos/update-bag.dto';
import { CommonResponsePromise } from '../common/types/common.type';
import { GetAllBagDto } from './dtos/get-bag.dto';
import { Defaults } from '../config/default.config';
import { User } from '../typeorm/user.entity';

@Injectable()
export class BagsService {
  constructor(
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createBag(user: User, createBagDto: CreateBagDto): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const bag = {
      user: user,
      bagName: createBagDto.bagName,
      brandName: createBagDto.brandName,
      bag_information: createBagDto.bag_information,
      bag_type: createBagDto.bag_type,
      bag_category: createBagDto.bag_category,
      gender: createBagDto.gender,
      offers: createBagDto.offers ?? [],
      bag_size: createBagDto.bag_size,
    };
    await this.bagRepository.save(bag);
    return ResponseHandler.success(bag, 'bag added successfully', HttpStatus.OK);
  }

  async updateBagDetails(user: User, bagId: number, updateBagDto: UpdateBagDto): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const bagDetails = await this.bagRepository.findOne({ where: { id: bagId } });
    if (!bagDetails) throw new NotFoundException(errorMessages.BAG_NOT_FOUND);

    const bag = {
      bagName: updateBagDto.bagName,
      brandName: updateBagDto.brandName,
      bag_information: updateBagDto.bag_information,
      bag_type: updateBagDto.bag_type,
      bag_category: updateBagDto.bag_category,
      gender: updateBagDto.gender,
      offers: updateBagDto.offers ?? [],
      bag_size: updateBagDto.bag_size,
    };

    await this.bagRepository.update({ id: bagId }, bag);

    return ResponseHandler.success({}, 'bag added successfully', HttpStatus.OK);
  }

  async deleteBag(user: User, bagId: number): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const bagDetails = await this.bagRepository.findOne({ where: { id: bagId } });
    if (!bagDetails) throw new NotFoundException(errorMessages.BAG_NOT_FOUND);
    await this.bagRepository.delete({ id: bagId });

    return ResponseHandler.success(bagDetails, 'bag added successfully', HttpStatus.OK);
  }

  async getBag(user: User, bagId: number): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const bagDetails = await this.bagRepository.findOne({ where: { id: bagId } });
    if (!bagDetails) throw new NotFoundException(errorMessages.BAG_NOT_FOUND);

    return ResponseHandler.success(bagDetails, 'bag added successfully', HttpStatus.OK);
  }

  async getAllBag(user: User, query: GetAllBagDto): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const page = query.page || Defaults.PAGINATION_PAGE_SIZE;
    const limit = query.limit || Defaults.PAGINATION_LIMIT;
    const skip = (page - 1) * limit;
    const sortValue = query.sortValue || 'updatedAt';
    const sortBy = query.sortBy === 'asc' ? 'ASC' : 'DESC';

    const searchText = query.searchText !== undefined && query.searchText !== null ? `%${query.searchText}%` : '%';

    const [bags, totalBagsCount] = await this.bagRepository
      .createQueryBuilder('bag')
      .orderBy(`bag.${sortValue}`, sortBy)
      .where('bag.brandName LIKE :searchText OR bag.bagName LIKE :searchText', { searchText })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalBagsCount / limit);

    return ResponseHandler.success({ bags, totalPages }, 'bags fetched successfully with total pages', HttpStatus.OK);
  }
}
