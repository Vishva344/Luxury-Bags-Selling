import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BidStatus } from '../bid.types';

export class CreateBidDto {
  @IsEnum(BidStatus)
  bidStatus: BidStatus;

  @IsNumber()
  @IsNotEmpty()
  buyerId: number;

  @IsNumber()
  @IsNotEmpty()
  sellerId: number;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  bagId: number;

  @IsString()
  @IsNotEmpty()
  IsAccept: boolean;
}
