import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Bag } from '../bags/entities/bags.entity';
import { Repository, getRepository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { CommonResponsePromise } from '../common/types/common.type';
import { ResponseHandler } from '../common/response-handler';
import { CreateBidDto } from './dtos/create-bid.dto';
import { UpdateBidDto } from './dtos/update-bid.dto';
import { Defaults } from '../config/default.config';
import { GetAllBidDto } from './dtos/get-AllBid.dto';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Bid) private readonly bidRepository: Repository<Bid>,
  ) {}

  async createBid(createBidDto: CreateBidDto): CommonResponsePromise {
    const bag = await this.bagRepository.findOne({ where: { id: createBidDto.bagId } });

    // const bag = await getRepository(Bag)
    //   .createQueryBuilder('bag')
    //   .where('bag.id = :id', { id: createBidDto.bagId })
    //   .orderBy('bag.id', 'ASC')
    //   .getOne();
    // console.log('🚀 ~ file: bid.service.ts:24 ~ BidService ~ createBid ~ bag:', bag);

    if (!bag) throw new NotFoundException('bag is not found');

    const user = await this.userRepository.findOne({ where: { id: createBidDto.buyerId } });
    if (!user) throw new NotFoundException('user is not found');
    const bidData = {
      user: user,
      bag: bag,
      // sellerId: bag,
      bidStatus: createBidDto.bidStatus,
      bid: createBidDto.bid,
    };
    const bid = await this.bidRepository.save(bidData);
    return ResponseHandler.success(bid, 'bid created successfully.', HttpStatus.OK);
  }

  async updateBid(user: User, bidId: number, updateBidDto: UpdateBidDto): CommonResponsePromise {
    const bid = await this.bidRepository.findOne({ where: { id: bidId } });
    if (!bid) throw new NotFoundException('bid is not found');
    const updateBid = await this.bidRepository.update({ id: bidId }, { bid: updateBidDto.bid });
    return ResponseHandler.success(updateBid, '', HttpStatus.OK);
  }

  async getBid(user: User, bidId: number): CommonResponsePromise {
    const bid = await this.bidRepository.findOne({ where: { id: bidId } });
    if (!bid) throw new NotFoundException('bid is not found');

    return ResponseHandler.success(bid, 'bid retrieve successfully.', HttpStatus.OK);
  }

  async getAllBid(userId: number, query: GetAllBidDto): CommonResponsePromise {
    const page = query.page || Defaults.PAGINATION_PAGE_SIZE;
    const limit = query.limit || Defaults.PAGINATION_LIMIT;
    const skip = (page - 1) * limit;
    const sortValue = query.sortValue || 'updatedAt';
    const sortBy = query.sortBy === 'asc' ? 'ASC' : 'DESC';

    const searchText = query.searchText !== undefined && query.searchText !== null ? `%${query.searchText}%` : '%';

    const [result, totalBidsCount] = await this.userRepository

      .createQueryBuilder('user')
      .innerJoinAndSelect('user.bids', 'bid')
      .where('user.id = :userId', { userId })
      // .where('bag.id = :bagId', { bagId })
      // .andWhere(`(bag.bagName LIKE :searchText)`, { searchText: `%${searchText}%` })
      .orderBy(`bid.${sortValue}`, sortBy)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalBidsCount / limit);
    if (!result) {
      throw new NotFoundException('message');
    }

    return ResponseHandler.success({ result, totalPages }, 'Bids retrieved successfully', HttpStatus.OK);
  }

  async getSellerBid(bagId: number, query: GetAllBidDto): CommonResponsePromise {
    const page = query.page || Defaults.PAGINATION_PAGE_SIZE;
    const limit = query.limit || Defaults.PAGINATION_LIMIT;
    const skip = (page - 1) * limit;
    const sortValue = query.sortValue || 'updatedAt';
    const sortBy = query.sortBy === 'asc' ? 'ASC' : 'DESC';

    const searchText = query.searchText !== undefined && query.searchText !== null ? `%${query.searchText}%` : '%';

    const [result, totalBidsCount] = await this.bagRepository

      .createQueryBuilder('bag')
      .innerJoinAndSelect('bag.bids', 'bid')
      .where('bag.id = :bagId', { bagId })
      // .where('bag.id = :bagId', { bagId })
      // .andWhere(`(bag.bagName LIKE :searchText)`, { searchText: `%${searchText}%` })
      .orderBy(`bid.${sortValue}`, sortBy)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalBidsCount / limit);
    if (!result) {
      throw new NotFoundException('message');
    }

    return ResponseHandler.success({ result, totalPages }, 'Bids retrieved successfully', HttpStatus.OK);
  }
}
