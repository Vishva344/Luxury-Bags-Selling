import { PickType } from '@nestjs/mapped-types';
import { CreateBidDto } from './create-bid.dto';

export class UpdateBidDto extends PickType(CreateBidDto, ['value', 'IsAccept'] as const) {}
