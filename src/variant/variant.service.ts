import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVariantData, VariantTable } from './types/variant.type';
import { ResponseHandler } from '../common/response-handler';
import { CreateVariantDto } from './dtos/create-variant.dto';
import { CommonFile, CommonResponsePromise } from '../common/types/common.type';
import { Bag, User, Variant } from '../typeorm';
import { UpdateVariantDto } from './dtos/update-variant.dto';
import { errorMessages } from '../config/messages.config';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant) private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createVariant(user: User, createVariantDto: CreateVariantDto, file: CommonFile[]): VariantTable {
    const userDetails = await this.userRepository.findOne({ where: { id: user.id } });
    if (!userDetails) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const bag = await this.bagRepository.findOne({ where: { id: createVariantDto.bagId } });
    if (!bag) throw new NotFoundException('Bag not found');

    let bagImages: string[] = [];

    if (file.length > 0) {
      bagImages = file.map((item) => item.location);
    }

    const variantData = {
      bagId: bag.id,
      bag_image: bagImages,
      stock: createVariantDto.stock,
      color: createVariantDto.color,
      price: createVariantDto.price,
      IsAvailable: createVariantDto.IsAvailable,
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

  async getVariant(): Promise<void> {
    await this.variantRepository.find();
  }
}
