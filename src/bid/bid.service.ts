import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Bag } from '../bags/entities/bags.entity';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { CommonResponsePromise } from '../common/types/common.type';
import { ResponseHandler } from '../common/response-handler';
import { CreateBidDto } from './dtos/create-bid.dto';
import { UpdateBidDto } from './dtos/update-bid.dto';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Bid) private readonly bidRepository: Repository<Bid>,
  ) {}

  async createBid(user: User, createBidDto: CreateBidDto): CommonResponsePromise {
    const bag = await this.bagRepository.findOne({ where: { id: createBidDto.bagId } });
    if (!bag) throw new NotFoundException('bag is not found');
    const bidData = {
      user: user,
      bag: bag,
      bidStatus: createBidDto.bidStatus,
      bid: createBidDto.bid,
    };
    await this.bidRepository.save(bidData);
    return ResponseHandler.success(bidData, '', HttpStatus.OK);
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
}
