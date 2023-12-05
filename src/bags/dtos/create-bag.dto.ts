import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BagCategory } from '../types/bags.type';

export class CreateBagDto {
  @IsString()
  @IsNotEmpty()
  bagName: string;

  @IsString()
  @IsNotEmpty()
  brandName: string;

  @IsString()
  @IsNotEmpty()
  bag_information: string;

  @IsString()
  @IsNotEmpty()
  bag_type: string;

  @IsNotEmpty()
  @IsEnum(BagCategory)
  bag_category: BagCategory;

  @IsArray()
  @IsString({ each: true })
  offers?: [string];

  @IsString()
  @IsNotEmpty()
  bag_size: string;
}
