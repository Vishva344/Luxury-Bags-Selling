import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVariantDto {
  @IsNumber()
  @IsNotEmpty()
  bagId: number;

  @IsString()
  @IsNotEmpty()
  stock: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsArray()
  @IsNotEmpty()
  bag_image: string[];

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsString()
  @IsNotEmpty()
  IsAvailable: boolean;
}
