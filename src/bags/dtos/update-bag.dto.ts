import { PickType } from '@nestjs/mapped-types';
import { CreateBagDto } from './create-bag.dto';

export class UpdateBagDto extends PickType(CreateBagDto, [
  'bagName',
  'bag_category',
  'bag_information',
  'bag_size',
  'bag_type',
  'brandName',
  'gender',
] as const) {}
