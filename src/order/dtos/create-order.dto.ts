import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DeliveryOption } from '../order.type';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  bidId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  sellerId: number;

  @IsNumber()
  @IsNotEmpty()
  bagId: number;

  @IsString()
  @IsOptional()
  @IsEnum(DeliveryOption)
  deliveryOption: DeliveryOption;
}
