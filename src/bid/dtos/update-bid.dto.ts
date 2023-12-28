import { PickType } from '@nestjs/mapped-types';
import { CreateBidDto } from './create-bid.dto';
import { IsNumber } from 'class-validator';

export class UpdateBidDto extends PickType(CreateBidDto, ['bid'] as const) {}
