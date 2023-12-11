import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  bag_id: number;

  @IsNumber()
  @IsNotEmpty()
  buyer_id: number;

  @IsNumber()
  @IsNotEmpty()
  variant_id: number;

  @IsString()
  @IsNotEmpty()
  isFavorite: boolean;
}
