import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BagCategory, BagType, Gender } from 'src/bags/types/bags.type';

export class CreateBagDto {
  @IsString()
  @IsNotEmpty()
  bagName: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataType)
  offers?: DataType[];

  @IsString()
  @IsNotEmpty()
  bag_size: string;
}

class DataType {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  offer: string;
}

// export class OffersDto {
//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => DataType)
//   offers?: DataType[];
// }
