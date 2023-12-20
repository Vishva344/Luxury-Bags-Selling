import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DeliveryOption } from '../order.type';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  variantId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  cartId: number;

  @IsString()
  @IsOptional()
  @IsEnum(DeliveryOption)
  deliveryOption: DeliveryOption;
}
