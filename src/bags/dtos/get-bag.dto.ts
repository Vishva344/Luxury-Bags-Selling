import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortBy } from '../../common/types/common.type';
import { SortFields } from '../../users/types/users.type';

export class GetAllBagDto {
  @IsNumber({})
  @Type(() => Number)
  @IsOptional()
  page: number;

  @IsNumber({})
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsString()
  @IsEnum(SortBy)
  @IsOptional()
  sortBy: string;

  @IsString()
  @IsEnum(SortFields)
  @IsOptional()
  sortValue: string;

  @IsString()
  @IsOptional()
  searchText: string;
}
