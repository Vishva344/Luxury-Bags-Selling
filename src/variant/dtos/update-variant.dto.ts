import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateVariantDto } from './create-variant.dto';

export class UpdateVariantDto extends PickType(CreateVariantDto, [
  'bagId',
  'bag_image',
  'stock',
  'color',
  'price',
  'IsAvailable',
  'condition',
] as const) {
  @IsNotEmpty()
  variantId: string;
}
