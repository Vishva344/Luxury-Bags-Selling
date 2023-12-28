import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BidStatus } from '../bid.types';

export class CreateBidDto {
  @IsEnum(BidStatus)
  bidStatus: BidStatus;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  bid: number;

  @IsNumber()
  @IsNotEmpty()
  bagId: number;
}
