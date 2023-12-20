import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVariantData, VariantTable } from './types/variant.type';
import { ResponseHandler } from '../common/response-handler';
import { CreateVariantDto } from './dtos/create-variant.dto';
import { CommonFile, CommonResponsePromise } from '../common/types/common.type';

import { UpdateVariantDto } from './dtos/update-variant.dto';
import { errorMessages } from '../config/messages.config';
import { GetAllVariantDto } from './dtos/get-variant.dto';
import { Defaults } from '../config/default.config';
import { User } from '../typeorm/user.entity';
import { Variant } from '../typeorm/variant.entity';
import { Bag } from '../typeorm/bags.entity';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant) private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createVariant(user: User, createVariantDto: CreateVariantDto, file: CommonFile[]): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const bag = await this.bagRepository.findOne({ where: { id: createVariantDto.bagId } });
    if (!bag) throw new NotFoundException('Bag not found');

    let bagImages: string[] = [];

    if (file.length > 0) {
      bagImages = file.map((item) => item.location);
    }

    const variantData = {
      bag: bag,
      bag_image: bagImages,
      stock: createVariantDto.stock,
      color: createVariantDto.color,
      price: createVariantDto.price,
      IsAvailable: true,
      condition: createVariantDto.condition,
    };

    const variants = await this.variantRepository.save(variantData);

    return ResponseHandler.success(variants, 'Bag added successfully', HttpStatus.OK);
  }

  async updateVariant(
    user: User,
    variantId: number,
    updateVariantDto: UpdateVariantDto,
    file?: CommonFile[],
  ): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const bag = await this.bagRepository.findOne({ where: { id: updateVariantDto.bagId } });
    if (!bag) throw new NotFoundException('Bag not found');

    const variant = await this.variantRepository.findOne({ where: { id: variantId } });
    if (!variant) throw new NotFoundException('Variant not found');

    const updateVariantData: UpdateVariantData = {
      stock: updateVariantDto.stock,
      color: updateVariantDto.color,
      price: updateVariantDto.price,
      IsAvailable: updateVariantDto.IsAvailable,
      condition: updateVariantDto.condition,
      bag_image: variant.bag_image,
    };

    if (file && file.length > 0) {
      const newImages = file.map((item) => item.location);
      updateVariantData.bag_image = [...variant.bag_image, ...newImages];
    }

    const updatedVariant = await this.variantRepository.update(variant.id, updateVariantData);

    return ResponseHandler.success({ updatedVariant }, 'Variant updated successfully', HttpStatus.OK);
  }

  async getVariant(user: User, variantId: number): CommonResponsePromise {
    const variant = await this.variantRepository
      .createQueryBuilder('variant')
      .innerJoin('variant.bag', 'bag')
      .addSelect(['bag.id'])
      .where('variant.id = :variantId AND variant.bagId = bag.id', { variantId })
      .getOne();

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    return ResponseHandler.success(variant, 'Variant retrieved successfully', HttpStatus.OK);
  }

  async getAllVariant(user: User, bagId: number, query: GetAllVariantDto): CommonResponsePromise {
    const userDetails = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const page = query.page || Defaults.PAGINATION_PAGE_SIZE;
    const limit = query.limit || Defaults.PAGINATION_LIMIT;
    const skip = (page - 1) * limit;
    const sortValue = query.sortValue || 'updatedAt';
    const sortBy = query.sortBy === 'asc' ? 'ASC' : 'DESC';
    const searchText = `%${query.searchText || ''}%`;

    const [result, totalVariantsCount] = await this.bagRepository

      .createQueryBuilder('bag')
      .innerJoinAndSelect('bag.variants', 'variant')
      .where('bag.id = :bagId', { bagId })
      .andWhere(`(variant.price LIKE :searchText OR variant.color LIKE :searchText)`, { searchText: `%${searchText}%` })
      .orderBy(`variant.${sortValue}`, sortBy)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalVariantsCount / limit);
    if (!result) {
      throw new NotFoundException(errorMessages.NO_VARIANT_FOUND);
    }

    return ResponseHandler.success({ result, totalPages }, 'Variants retrieved successfully', HttpStatus.OK);
  }

  async deleteVariant(user: User, variantId: number): CommonResponsePromise {
    const variantData = await this.variantRepository.delete({ id: variantId });
    if (!variantData.affected) throw new BadRequestException(errorMessages.VARIANT_NOT_DELETED);

    return ResponseHandler.success({}, 'delete variant successfully', HttpStatus.OK);
  }
}
