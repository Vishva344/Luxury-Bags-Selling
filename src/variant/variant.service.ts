import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariantTable } from './types/variant.type';
import { ResponseHandler } from '../common/response-handler';
import { CreateVariantDto } from './dtos/variant.dto';
import { CommonFile } from '../common/types/common.type';
import { Bag, Variant } from '../typeorm';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant) private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
  ) {}

  async createVariant(createVariantDto: CreateVariantDto, file: CommonFile[]): VariantTable {
    const bag = await this.bagRepository.findOne({ where: { id: createVariantDto.bag_id } });
    console.log('🚀 ~ file: variant.service.ts:19 ~ VariantService ~ createVariant ~ bag:', bag);
    if (!bag) throw new NotFoundException('not found');

    const variant = this.variantRepository.create({
      // ...createVariantDto,
      bag_id: bag.id,
      bag_image: file[0].location,
      stock: createVariantDto.stock,
      color: createVariantDto.color,
      price: createVariantDto.price,
      IsAvailable: createVariantDto.IsAvailable,
      condition: createVariantDto.condition,
    });

    await this.variantRepository.save(variant);
    return ResponseHandler.success(variant, 'bag added successfully', HttpStatus.OK);
  }
}
