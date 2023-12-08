import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bag } from '../typeorm/bags.entity';
import { CreateBagDto } from './dtos/create-bag.dto';
import { ResponseHandler } from '../common/response-handler';
import { bagTable } from './types/bags.type';

@Injectable()
export class BagsService {
  constructor(@InjectRepository(Bag) private readonly bagRepository: Repository<Bag>) {}

  async createBag(createBagDto: CreateBagDto): bagTable {
    const bag = this.bagRepository.create({
      bagName: createBagDto.bagName,
      brandName: createBagDto.brandName,
      bag_information: createBagDto.bag_information,
      bag_type: createBagDto.bag_type,
      bag_category: createBagDto.bag_category,
      gender: createBagDto.gender,
      offers: createBagDto.offers,
      bag_size: createBagDto.bag_size,
    });
    console.log('🚀 ~ file: bags.service.ts:14 ~ BagsService ~ createBag ~ createBag:', bag);
    await this.bagRepository.save(bag);

    return ResponseHandler.success(bag, 'bag added successfully', HttpStatus.OK);
  }
}
