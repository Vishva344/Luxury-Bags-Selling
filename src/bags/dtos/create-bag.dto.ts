import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BagCategory, BagType, Gender } from 'src/bags/types/bags.type';

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
  @IsOptional()
  @IsEnum(BagType)
  bag_type?: BagType;

  @IsEnum(BagCategory)
  bag_category: BagCategory;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  offers: string;

  @IsString()
  @IsNotEmpty()
  bag_size: string;
}
